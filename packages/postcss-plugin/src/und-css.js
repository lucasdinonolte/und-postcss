const fs = require('fs')
const path = require('path')

const buildUtilities = require('./generators/utilities')

module.exports = ({ config, tokens }) => {
  const { namespaces } = config

  return {
    OnceExit: (root) => {
      const prepend = [`/* UND CSS Output: ${new Date().toISOString()} */\n`]
      prepend.push(fs.readFileSync(path.join(__dirname, '/css/globals/reset.globals.css'), 'utf-8'))
      root.prepend(prepend.join())
    },
    AtRule: {
      "und-css-tokens": (rule, { Declaration, Rule }) => {
        rule.replaceWith(new Rule({ selector: ':root' }).append(tokens.map((token) => {
          return new Declaration({ prop: token.variableName, value: token.value })
        })))
      }, 
      "und-css-layouts": (rule, { Declaration }) => {
        const layouts = []
        layouts.push(fs.readFileSync(path.join(__dirname, '/css/layouts/box.layout.css'), 'utf-8'))

        rule.replaceWith(layouts.join())
      },
      "und-css-utilities": (rule, { Rule, Declaration }) => {
        const utilities = buildUtilities({ config, tokens })
        const utilityStyles = []
        utilities.forEach((utility) => {
          utility.values.forEach((value) => {
            const selector = `.${namespaces.utilities}${utility.prefix}${value.name}`
            utilityStyles.push(new Rule({ selector })
              .append(
                utility.properties.map((prop) => {
                  return new Declaration({ prop, value: value.value })
                })
              )
            )
          })
        })

        rule.replaceWith(utilityStyles)
      },
    },
  }
}

module.exports.postcss = true
