const calculateRem = require('../util/calculateRem')
const calculateClamp = require('../util/calculateClamp')

module.exports = ({ typography, layout }) => {
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

  const { minWidth, maxWidth } = layout
  const { spacing, spacingInterpolations } = layout

  return {
    addTokens: ({ addToken }) => {
      addToken('layout', 'min-width', `${calculateRem(minWidth)}rem`)
      addToken('layout', 'max-width', `${calculateRem(maxWidth)}rem`)

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

      const { scale } = typography

      const addScaleStep = (index, min, max) => {
        const value = calculateClamp(min, max, minWidth, maxWidth)
        addToken('font', index, value)
      }

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
    },
    addUtilities: ({ tokensForNamespace, addUtility }) => {
      const fontSizes = tokensForNamespace('font')
      const spacings = tokensForNamespace('space')

      addUtility('text-', 'font-size', fontSizes)

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
