module.exports = (config) => {
  return {
    addTokens: ({ addToken }) => {
      const sizes = typeof config.sizes === 'function' ? config.sizes() : config.sizes
      
      Object.keys(sizes).forEach((name) => {
        const value = sizes[name]
        addToken('text', name, value)
      })

      const { leading, tracking, fontFamilies } = config

      for (const [name, value] of Object.entries(leading)) {
        addToken('leading', name, value)
      }

      for (const [name, value] of Object.entries(tracking)) {
        addToken('tracking', name, value)
      }
      
      for (const [name, value] of Object.entries(fontFamilies)) {
        addToken('font', name, value.join(','))
      }
    },
    addUtilities: ({ tokensForNamespace, addUtility }) => {
      addUtility('text-', 'font-size', tokensForNamespace('text'))
      addUtility('lh-', 'line-height', tokensForNamespace('leading'))
      addUtility('ls-', 'letter-spacing', tokensForNamespace('tracking'))
      addUtility('font-', 'font-family', tokensForNamespace('font'))
    },
  }
}
