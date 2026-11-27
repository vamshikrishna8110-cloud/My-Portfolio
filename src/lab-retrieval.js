const commonWords = new Set('a an are do for how i in is it of on or the to what when where which who with'.split(' '))
const vocabulary = Object.fromEntries([
  ['access', 'permission permissions authorization authorize access'],
  ['contractor', 'contractor contractors vendor vendors'],
  ['outage', 'outage outages incident incidents disruption'],
  ['escalation', 'escalate escalation notify alert'],
  ['deployment', 'deployment deploy release releases rollout'],
  ['retention', 'retention retain keep store stored'],
  ['delete', 'delete remove cleanup purge'],
].flatMap(([concept, variants]) => variants.split(' ').map(word => [word, concept])))

function tokens(text, expand = false) {
  const words = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []
  return new Set(words.filter(word => !commonWords.has(word)).map(word => expand && Object.hasOwn(vocabulary, word) ? vocabulary[word] : word))
}

function overlap(query, candidate) {
  return [...query].filter(term => candidate.has(term)).length
}

export function retrieve(query, candidates, { semantic = false } = {}) {
  const terms = tokens(query, semantic)
  return candidates.map(candidate => {
    const indexed = tokens(candidate.title + ' ' + candidate.body, semantic)
    const matches = overlap(terms, indexed)
    const score = matches && semantic ? matches / Math.sqrt(terms.size * indexed.size) : matches
    return { ...candidate, score }
  }).filter(candidate => candidate.score > 0).sort((a, b) => b.score - a.score)
}

export function extractAnswer(question, document) {
  const chunks = document.match(/[^.!?\n]+[.!?]?/g) ?? []
  const passages = chunks.map((part, index) => ({
    title: 'Passage ' + (index + 1),
    body: part.trim(),
  })).filter(passage => passage.body)
  return retrieve(question, passages, { semantic: true })[0]
}

export function evaluateAnswer(candidate, reference, evidence) {
  const start = performance.now()
  const answer = tokens(candidate)
  const expected = tokens(reference)
  const evidenceTerms = tokens(evidence)
  const matches = overlap(answer, expected)
  return {
    referenceF1: answer.size + expected.size ? 2 * matches / (answer.size + expected.size) : 0,
    evidenceCoverage: answer.size ? overlap(answer, evidenceTerms) / answer.size : 0,
    milliseconds: performance.now() - start,
  }
}
