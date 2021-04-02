const isColor = require('is-color')

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
    if (!colors[name].startsWith('var(') && !isColor(colors[name])) {
      throw new Error(`colors.${name} does not contain a valid CSS color`)
    }
    addToken('color', name, colors[name])
  })

  addToken('layout', 'min-width', `${calculateRem(minWidth)}rem`)
  addToken('layout', 'max-width', `${calculateRem(maxWidth)}rem`)
  
  // Spacing Tokens
  const addSpacingToken = (name, _min, _max) => {
    const min = _min * typography.scale.minSize
    const max = _max * typography.scale.maxSize 
    addToken('space', name, calculateClamp(min, max, minWidth, maxWidth))
  }

  if (typeof layout.defaultSpacing !== 'number') {
    throw new Error(`${layout.defaultSpacing} is not a valid value for layout.defaultSpacing`)
  }

  addSpacingToken('default', layout.defaultSpacing, layout.defaultSpacing)

  Object.keys(spacing).forEach((name) => {
    if (typeof spacing[name] !== 'number') {
      throw new Error(`Spacing "${name}" does not contain a valid value. Got ${spacing[name]} (${typeof spacing[name]}) expected a Number`)
    }
    addSpacingToken(name, spacing[name], spacing[name])
  })

  // Spacing Interpolations
  spacingInterpolations.forEach((interpolation) => {
    const from = interpolation[0]
    const to = interpolation[1]
    const name = `${from}-${to}`

    if (!spacing[from] || !spacing[to]) {
      throw new Error(`Spacing Interpolation "${from}-${to}" contains an undefined spacing value.`)
    }
    
    addSpacingToken(name, spacing[from], spacing[to])
  })

  // Typography Tokens
  // =================
  const addScaleStep = (index, min, max) => {
    addToken('font', index, calculateClamp(min, max, minWidth, maxWidth))
  }

  // Font Size Scale
  const { scale } = typography

  Object.keys(scale).forEach((key) => {
    if (typeof scale[key] !== 'number') {
      throw new Error(`Invalid value given for typography.scale.${key}. Expected Number got ${typeof scale[key]}`)
    }
  })

  Array.from(Array(scale.stepsBelow)).forEach((n, index) => {
    const iterator = index + 1
    const min = scale.minSize / Math.pow(scale.minRatio, iterator)
    const max = scale.maxSize / Math.pow(scale.maxRatio, iterator)

    addScaleStep(`-${iterator}`, min, max)
  })

  addScaleStep('0', scale.minSize, scale.maxSize)

  Array.from(Array(scale.stepsAbove)).forEach((n, index) => {
    const iterator = index + 1
    const min = scale.minSize * Math.pow(scale.minRatio, iterator)
    const max = scale.maxSize * Math.pow(scale.maxRatio, iterator)

    addScaleStep(`${iterator}`, min, max)
  })

  // Leading
  const { leading } = typography

  Object.keys(leading).forEach((key) => {
    if (typeof leading[key] !== 'number') {
      throw new Error(`Invalid value given for typography.leading.${key}. Expected Number got ${typeof leading[key]}`)
    }
    addToken('leading', key, leading[key])
  })
  
  // Tracking
  const { tracking } = typography

  Object.keys(tracking).forEach((key) => {
    if (typeof tracking[key] !== 'number') {
      throw new Error(`Invalid value given for typography.tracking.${key}. Expected Number got ${typeof tracking[key]}`)
    }
    addToken('tracking', key, `${tracking[key]}em`)
  })

  return tokens
}
