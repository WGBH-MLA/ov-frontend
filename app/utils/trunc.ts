/* Truncate a string to a maximum length, adding ellipsis if necessary.
 * If empty, return 'Untitled'.
 * If longer than maxLength, truncate at the nearest word and add '...'.
 * Otherwise, return it as is.
 */
export default (text: string, maxLength: number = 120) => {
  if (!text) {
    return 'Untitled'
  }
  if (text.length > maxLength) {
    if (text[maxLength] !== ' ') {
      // if the text is longer than maxLength, but not a space at the end,
      // find the last space before maxLength
      let lastSpace = text.lastIndexOf(' ', maxLength)
      if (lastSpace > 0) {
        return text.slice(0, lastSpace) + '...'
      }
    }

    return text.slice(0, maxLength) + '...'
  } else {
    return text
  }
}
