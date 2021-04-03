const calculateRem = require('./calculateRem')
const calculateClamp = require('./calculateClamp')

module.exports = (config) => {
  let spaces = {}
  Object.keys(config.spaces).forEach((name) => {
    const value = config.spaces[name]
    const min = value * config.minFontSize
    const max = value * config.maxFontSize
    spaces[name] = calculateClamp(min, max, config.minWidth, config.maxWidth)
  })
  
  return spaces
}
