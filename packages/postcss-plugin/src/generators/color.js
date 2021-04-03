const isColor = require('is-color')

module.exports = (colors) => {
  return {
    addTokens: ({ addToken }) => {
      Object.keys(colors).forEach((name) => {
        if (!colors[name].startsWith('var(') && !isColor(colors[name])) {
          throw new Error(`colors.${name} does not contain a valid CSS color`)
        }
        addToken('color', name, colors[name])
      })
    },
    addUtilities: ({ tokensForNamespace, addUtility }) => {
      const colors = tokensForNamespace('color')

      addUtility('text-', 'color', colors)
      addUtility('bg-', 'background-color', colors)
    },
  }
}
