const calculateRem = require('../util/calculateRem')
const calculateClamp = require('../util/calculateClamp')

module.exports = (config) => {
  const tokens = []

  const { colors, layout, typography } = config
  const { spacing, spacingInterpolations } = layout

  const maxWidth = layout.maxWidth
  const minWidth = layout.minWidth
  
  // Generic Add Token
  const addToken = (namespace, name, value) => {
    const variableName = `--${namespace}-${name}`
    tokens.push({ variableName, value, namespace, name })
  }

  // Color Tokens
  Object.keys(colors).forEach((name) => {
    addToken('color', name, colors[name])
  })

  addToken('layout', 'min-width', `${calculateRem(minWidth)}rem`)
  addToken('layout', 'max-width', `${calculateRem(maxWidth)}rem`)
  
  // Spacing Tokens
  const addSpacingToken = (name, _min, _max) => {
    const min = _min * typography.minSize
    const max = _max * typography.maxSize 
    addToken('space', name, calculateClamp(min, max, minWidth, maxWidth))
  }

  Object.keys(spacing).forEach((name) => {
    addSpacingToken(name, spacing[name], spacing[name])
  })

  // Spacing Interpolations
  spacingInterpolations.forEach((interpolation) => {
    const from = interpolation[0]
    const to = interpolation[1]
    const name = `${from}-${to}`
    
    addSpacingToken(name, spacing[from], spacing[to])
  })

  // Typography Tokens
  const addScaleStep = (index, min, max) => {
    addToken('font', index, calculateClamp(min, max, minWidth, maxWidth))
  }

  // Build Scale
  Array.from(Array(typography.stepsBelow)).forEach((n, index) => {
    const iterator = index + 1
    const min = typography.minSize / Math.pow(typography.minRatio, iterator)
    const max = typography.maxSize / Math.pow(typography.maxRatio, iterator)

    addScaleStep(`-${iterator}`, min, max)
  })

  addScaleStep('0', typography.minSize, typography.maxSize)

  Array.from(Array(typography.stepsAbove)).forEach((n, index) => {
    const iterator = index + 1
    const min = typography.minSize * Math.pow(typography.minRatio, iterator)
    const max = typography.maxSize * Math.pow(typography.maxRatio, iterator)

    addScaleStep(`${iterator}`, min, max)
  })

  return tokens
}
