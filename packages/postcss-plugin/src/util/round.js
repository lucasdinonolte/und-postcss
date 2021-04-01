module.exports = (n, precision = 3) => +(Math.round(n + `e+${precision}`)  + `e-${precision}`)
