const fs = require('fs')
const path = require('path')

const buildUtilities = require('./generators/utilities')

module.exports = ({ config, tokens }) => {
  const { namespaces } = config

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
        // Prepend Token Definitions
        rule.replaceWith(new Rule({ selector: ':root' }).append(tokens.map((token) => {
          return new Declaration({ prop: token.variableName, value: token.value })
        })))
      }, 
      "und-css-layouts": (rule, { Declaration }) => {
        // TODO: Output Layouts / Objects
      },
      "und-css-utilities": (rule, { Rule, Declaration }) => {
        // Append Utility classes
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
      "respond-to": (rule, { AtRule }) => {
        rule.replaceWith(new AtRule({ name: 'media', params: 'screen' }).append(rule.nodes))
      },
    },
  }
}

module.exports.postcss = true
