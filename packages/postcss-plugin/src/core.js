const { kebabCase } = require('lodash')
const calculateRem = require('./util/calculateRem')
const escapeClassName = require('./util/escapeClassName')

module.exports = (config) => {
  const tokens = []
  const layouts = []
  const utilities = []

  const { generators, namespaces } = config

  const breakpoints = Object.keys(config.breakpoints).map((bp) => ({
    name: bp,
    variableName: `--${bp}`,
    value: `(min-width: ${calculateRem(config.breakpoints[bp])}rem)`,
  }))

  const addToken = (namespace, name, value) => {
    const variableName = `--${!!namespace ? `${namespace}-` : ''}${name}`
    tokens.push({ variableName, value, namespace, name })
    return `var(${variableName})`
  }

  const addUtility = (prefix, _properties, values, responsive = !!config.settings.responsiveUtilities) => {
    utilities.push({
      prefix,
      properties: Array.isArray(_properties) ? _properties : [_properties],
      values,
      responsive,
    })
  }

  const resolveConfigTokens = (input, namespace = []) => {
    if (typeof input !== 'object') return
    Object.keys(input).forEach((key) => {
      const value = Array.isArray(input[key]) ? input[key].join(', ') : input[key]
      if (typeof value === 'object') {
        resolveConfigTokens(value, [...namespace, key])
      } else {
        const kebabCasedNamespace = namespace.map((n) => kebabCase(n))
        addToken(kebabCasedNamespace.join('-'), kebabCase(key), value)
      }
    })
  }

  const resolveConfigUtilities = (input) => {
    if (typeof input !== 'object') return
    Object.keys(input).forEach((prefix) => {
      const utility = input[prefix]
      const properties = utility.property || utility.properties
      const values = Object.keys(utility.values).map((val) => ({
        name: val, value: utility.values[val]
      }))

      addUtility(prefix, properties, values)
    })
  }

  resolveConfigTokens(config.tokens || {})
  resolveConfigUtilities(config.utilities || {})

  return {
    addToken,
    addUtility,
    addLayout: () => {
      // TODO
    },
    tokensForNamespace: (namespace) => {
      return tokens.filter((t) => t.namespace === namespace)
        .map(({ name, variableName }) => ({ name, value: `var(${variableName})` }))
    },
    buildTokenCode: ({ Declaration, Rule }) => {
      if (tokens.length === 0) return ''
      return new Rule({ selector: ':root' }).append(tokens.map((token) => {
        return new Declaration({ prop: token.variableName, value: token.value })
      }))
    },
    buildUtilitiesCode: ({ Declaration, Rule, AtRule }) => {
      if (utilities.length === 0) return ''
      const utilityStyles = []
      utilities.forEach((utility) => {
        utility.values.forEach((value) => {
          const selector = `${namespaces.utilities}${utility.prefix}${value.name}`
          utilityStyles.push(new Rule({ selector: `.${escapeClassName(selector)}` })
            .append(
              utility.properties.map((prop) => {
                return new Declaration({ prop, value: value.value })
              })
            )
          )

          if (utility.responsive) {
            breakpoints.forEach((bp) => {
              utilityStyles.push(new AtRule({ name: 'media', params: bp.value }).append(
                new Rule({ selector: `.${escapeClassName(`${bp.name}:${selector}`)}` })
                  .append(
                    utility.properties.map((prop) => {
                      return new Declaration({ prop, value: value.value })
                    })
                  )
              ))
            })
          }
        })
      })

      return utilityStyles
    },
    generators,
    config,
    breakpoints,
  }
}
