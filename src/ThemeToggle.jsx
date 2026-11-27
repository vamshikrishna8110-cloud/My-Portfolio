import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [light, setLight] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') === 'light' } catch { return false }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f7f9fd' : '#000000')
  }, [light])

  function toggle() {
    try { localStorage.setItem('portfolio-theme', light ? 'dark' : 'light') } catch { /* Storage can be unavailable in local previews. */ }
    setLight(!light)
  }

  return (
    <button className="theme-toggle" type="button" aria-label="Light theme" aria-pressed={light} onClick={toggle}>
      {light ? <Moon size={19} aria-hidden="true" /> : <Sun size={19} aria-hidden="true" />}
    </button>
  )
}
