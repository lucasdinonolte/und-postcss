const undCss = require('@und-css/postcss-plugin')

module.exports = {
  plugins: [
    undCss({
      colors: {
        yellow: '#ffff00',
      },
    }),
  ]
}
