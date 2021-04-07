const fs = require('fs')
const path = require('path')

const calculateRem = require('./util/calculateRem')
const defaultConfig = require('./config')

module.exports = (_config = {}) => {
  let externalConfig = _config
  const externalConfigFile = path.join(process.cwd(), 'undcss.config.js')
  if (fs.existsSync(externalConfigFile)) {
    externalConfig = require(externalConfigFile)
  }

  const config = Object.assign(defaultConfig, externalConfig)
  const undCss = require('./core')(config)

  return {
    postcssPlugin: 'und-css',
    plugins: [
      require('./postcss-plugin')(undCss),
      require('postcss-custom-media')({
        importFrom: () => {
          const customMedia = {}
          undCss.breakpoints.forEach((bp) => {
            customMedia[bp.variableName] = bp.value
          })

          return { customMedia }
        }
      }),
      require('postcss-nested')(),
    ]
  }
}

module.exports.postcss = true
