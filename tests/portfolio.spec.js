import { expect, test } from '@playwright/test'

const endpoint = 'https://formspree.io/f/*'
const applicant = {
  Name: 'Test Recruiter',
  Email: 'recruiter@example.com',
  Position: 'AI Engineer',
  'Contact number': '+1 555 010 1000',
  Description: 'Synthetic test opportunity',
}

function opportunity(page) {
  return page.getByRole('form', { name: 'Job opportunity' })
}

async function fillOpportunity(form) {
  for (const [label, value] of Object.entries(applicant)) await form.getByLabel(label, { exact: true }).fill(value)
}

test('rejects missing fields and malformed email without sending a request', async ({ page }) => {
  let requests = 0
  await page.route(endpoint, async route => { requests++; await route.abort() })
  await page.goto('./')
  const form = opportunity(page)
  const submit = form.getByRole('button', { name: 'Submit Job Opportunity' })
  await expect(form.getByRole('textbox')).toHaveCount(5)
  await submit.click()
  await expect(form.locator(':invalid').first()).toBeVisible()
  await fillOpportunity(form)
  await form.getByLabel('Email').fill('bad email')
  await submit.click()
  expect(await form.getByLabel('Email').evaluate(input => input.validity.typeMismatch)).toBe(true)
  expect(requests).toBe(0)
})

test('submits once and clears the form only after success', async ({ page }) => {
  let requests = 0
  let releaseResponse
  const responseGate = new Promise(resolve => { releaseResponse = resolve })
  await page.route(endpoint, async route => {
    requests++
    expect(route.request().method()).toBe('POST')
    expect(route.request().postData()).toContain(applicant.Description)
    await responseGate
    await route.fulfill({ status: 200, json: { ok: true } })
  })
  await page.goto('./')
  const form = opportunity(page)
  await fillOpportunity(form)
  await form.getByRole('button', { name: 'Submit Job Opportunity' }).click()
  await expect(form.getByRole('button', { name: 'Submitting…' })).toBeDisabled()
  await form.evaluate(el => el.requestSubmit())
  releaseResponse()
  await expect(form.getByRole('status')).toContainText('submitted successfully')
  await expect(form.getByLabel('Description')).toHaveValue('')
  expect(requests).toBe(1)
})

test('keeps entries after a failed submission and allows a retry', async ({ page }) => {
  let requests = 0
  await page.route(endpoint, route => route.fulfill({ status: ++requests === 1 ? 422 : 200, json: {} }))
  await page.goto('./')
  const form = opportunity(page)
  await fillOpportunity(form)
  const submit = form.getByRole('button', { name: 'Submit Job Opportunity' })
  await submit.click()
  await expect(form.getByRole('alert')).toContainText('Your entries are still here')
  for (const [label, value] of Object.entries(applicant)) await expect(form.getByLabel(label)).toHaveValue(value)
  await submit.click()
  await expect(form.getByRole('status')).toContainText('submitted successfully')
  expect(requests).toBe(2)
})

test('mobile navigation closes on Escape and follows section links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('./')
  const toggle = page.locator('#menu-toggle')
  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  await expect(nav).toBeHidden()
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(nav).toBeHidden()
  await toggle.click()
  await nav.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.locator('#projects')).toBeFocused()
  await expect(nav).toBeHidden()
})

test('hero and contact both download a valid PDF résumé', async ({ page }) => {
  await page.goto('./')
  const links = page.getByRole('link', { name: /download résumé/i })
  await expect(links).toHaveCount(2)
  const response = await page.request.get(await links.first().getAttribute('href'))
  expect(response.ok()).toBe(true)
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
  for (const link of await links.all()) {
    const downloadPromise = page.waitForEvent('download')
    await link.click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe('Venkat-Akula-Resume.pdf')
    expect(await download.failure()).toBeNull()
  }
})

test('theme is keyboard accessible and persists across reloads', async ({ page }) => {
  await page.goto('./')
  const toggle = page.getByRole('button', { name: 'Light theme' })
  await expect(toggle).toHaveAttribute('aria-pressed', 'false')
  await toggle.focus()
  await page.keyboard.press('Space')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
})

test('VA cube floats, responds to the pointer, and respects reduced motion', async ({ page }) => {
  const panel = page.locator('.hero-art')
  const cube = panel.locator('.cube-float')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('./')
  await expect(cube).toBeVisible()
  const animation = () => cube.evaluate(el => el.ownerDocument.defaultView.getComputedStyle(el).animationName)
  expect(await animation()).toBe('cube-float')
  await panel.hover({ position: { x: 20, y: 20 } })
  expect(await panel.evaluate(el => el.style.getPropertyValue('--cube-x'))).not.toBe('')
  await page.mouse.move(0, 0)
  expect(await panel.evaluate(el => el.style.getPropertyValue('--cube-x'))).toBe('')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(await animation()).toBe('none')
  await panel.hover({ position: { x: 20, y: 20 } })
  expect(await panel.evaluate(el => el.style.getPropertyValue('--cube-x'))).toBe('')
})
