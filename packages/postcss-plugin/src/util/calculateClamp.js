const calculateRem = require('./calculateRem')
const roundNumber = require('./round')

module.exports = (_min, _max, _minWidth, _maxWidth) => {
    const min = calculateRem(_min)
    const max = calculateRem(_max)
    const minWidth = calculateRem(_minWidth)
    const maxWidth = calculateRem(_maxWidth)
    const slope = (max - min) / (maxWidth - minWidth)
    const intersection = (-1 * minWidth) * slope + min

    return `clamp(${roundNumber(min)}rem, ${roundNumber(intersection)}rem + ${roundNumber(slope * 100)}vw, ${roundNumber(max)}rem)`
}
