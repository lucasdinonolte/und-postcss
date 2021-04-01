const buildTokens = require('./generators/tokens')

const defaultConfig = require('./config')

module.exports = (externalConfig = {}) => {
  const config = Object.assign(defaultConfig, externalConfig)
  const tokens = buildTokens(config)

  return {
    postcssPlugin: 'und-css',
    plugins: [
      require('./und-css')({ config, tokens }),
      require('postcss-custom-media')({
        importFrom: () => {
          const customMedia = {}
          Object.keys(config.breakpoints).forEach((bp) => {
            customMedia[`--${bp}`] = config.breakpoints[bp]
          })

          return { customMedia }
        }
      }),
    ]
  }
}

module.exports.postcss = true
