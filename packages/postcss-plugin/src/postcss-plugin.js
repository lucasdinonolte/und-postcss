const fs = require('fs')
const path = require('path')

module.exports = (undCss) => {
  undCss.generators.forEach((m) => {
    // run each generator
  })

  return {
    OnceExit: (root) => {
      const prepend = [`/* UND CSS Output: ${new Date().toISOString()} */\n`]
      prepend.push(fs.readFileSync(path.join(__dirname, '/css/globals/reset.globals.css'), 'utf-8'))
      root.prepend(prepend.join())
    },
    AtRule: {
      "und-css-tokens": (rule, { Declaration, Rule }) => {
        rule.replaceWith(undCss.buildTokenCode({ Declaration, Rule }))
      }, 
      "und-css-layouts": (rule, { Declaration }) => {
        rule.replaceWith('/* LAYOUTS */')
      },
      "und-css-utilities": (rule, { AtRule, Rule, Declaration }) => {
        rule.replaceWith(undCss.buildUtilitiesCode({ AtRule, Declaration, Rule }))
      },
    },
  }
}

module.exports.postcss = true
