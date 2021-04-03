const calculateRem = require('../util/calculateRem')
const calculateClamp = require('../util/calculateClamp')

module.exports = (config) => {
  let sizes = {}
  Array.from(Array(config.stepsBelow)).forEach((n, index) => {
    const iterator = index + 1
    const min = config.minSize / Math.pow(config.minRatio, iterator)
    const max = config.maxSize / Math.pow(config.maxRatio, iterator)

    sizes[`-${iterator}`] = calculateClamp(min, max, config.minWidth, config.maxWidth)
  })

  sizes['0'] = calculateClamp(config.minSize, config.maxSize, config.minWidth, config.maxWidth)

  Array.from(Array(config.stepsAbove)).forEach((n, index) => {
    const iterator = index + 1
    const min = config.minSize * Math.pow(config.minRatio, iterator)
    const max = config.maxSize * Math.pow(config.maxRatio, iterator)

    sizes[iterator] = calculateClamp(min, max, config.minWidth, config.maxWidth)
  })

  return sizes
}
