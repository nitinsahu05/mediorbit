import { responses, DEFAULT_RESPONSE } from '../data/chatbotData.js'

/**
 * Find best matching response for user input
 */
export const getResponse = (input) => {
  const text = input.toLowerCase().trim()

  if (!text) return DEFAULT_RESPONSE

  // Score each response by how many keywords match
  let bestMatch = null
  let bestScore = 0

  for (const item of responses) {
    let score = 0
    for (const keyword of item.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        // Longer keyword = more specific = higher score
        score += keyword.length
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = item
    }
  }

  return bestMatch ? bestMatch.response : DEFAULT_RESPONSE
}

/**
 * Format markdown-like text to JSX-friendly HTML string
 * Supports: **bold**, newlines, bullet points
 */
export const formatMessage = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
}
