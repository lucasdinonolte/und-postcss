module.exports = (config) => {
  const SPACING_PROPERTIES = {
    p: 'padding',
    m: 'margin',
  }

  const SPACING_DIRECTIONS = {
    t: ['-top'],
    r: ['-right'],
    b: ['-bottom'],
    l: ['-left'],
    x: ['-left', '-right'],
    y: ['-top', '-bottom'],
  }

  const convertSpacingValue = (_value) => {
    let value = _value;
    if (typeof _value === 'number') value = `${_value}rem`
    return value
  }

  return {
    addTokens: ({ addToken }) => {
      const spaces = typeof config.spaces === 'function' ? config.spaces() : config.spaces
      const { defaultSpacing } = config || 1
      
      addToken('space', 'default', convertSpacingValue(defaultSpacing))

      Object.keys(spaces).forEach((name) => {
        const value = convertSpacingValue(spaces[name])
        addToken('space', name, value)
      })
    },
    addUtilities: ({ tokensForNamespace, addUtility }) => {
      const spacings = tokensForNamespace('space')
      Object.keys(SPACING_PROPERTIES).forEach((key) => {
        const attribute = SPACING_PROPERTIES[key]
        addUtility(`${key}-`, attribute, spacings)
        Object.keys(SPACING_DIRECTIONS).forEach((dir) => {
          const properties = SPACING_DIRECTIONS[dir].map((d) => `${attribute}${d}`)
          addUtility(`${key}${dir}-`, properties, spacings)
        })
      })
    },
  }
}
