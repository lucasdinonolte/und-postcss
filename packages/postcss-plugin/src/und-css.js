const fs = require('fs')
const path = require('path')

module.exports = ({ config, tokens }) => {
  return {
    OnceExit: (root) => {
      const prepend = [`/* UND CSS Output: ${new Date().toISOString()} */\n`]
      root.prepend(prepend.join())
    },
    AtRule: {
      "und-css-base": (rule) => {
        rule.replaceWith(fs.readFileSync(path.join(__dirname, '/css/globals/reset.globals.css'), 'utf-8'))
      },
      "und-css-tokens": (rule, { Declaration, Rule }) => {
        rule.replaceWith(new Rule({ selector: ':root' }).append(tokens.map((token) => {
          return new Declaration({ prop: token.variableName, value: token.value })
        })))
      }, 
      "und-css-layouts": (rule, { Declaration }) => {
        // TODO: Output Layouts / Objects
      },
      "und-css-utilities": (rule, { Declaration }) => {
        rule.replaceWith('/* TODO */')
      },
      "respond-to": (rule, { AtRule }) => {
        rule.replaceWith(new AtRule({ name: 'media', params: 'screen' }).append(rule.nodes))
      },
    },
  }
}

module.exports.postcss = true
