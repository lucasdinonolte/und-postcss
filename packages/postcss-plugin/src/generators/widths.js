module.exports = (widths = {}) => {
  const values = Object.keys(widths).map((w) => ({
    name: w,
    value: widths[w],
  }))

  return {
    addUtilities: ({ addUtility }) => {
      addUtility('w-', 'width', values, true)
      addUtility('max-w-', 'max-width', values, true)
      addUtility('min-w-', 'min-width', values, true)
    }
  }
}
