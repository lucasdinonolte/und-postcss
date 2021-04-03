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

  return {
    addToken: (namespace, name, value) => {
      const variableName = `--${namespace}-${name}`
      tokens.push({ variableName, value, namespace, name })
      return `var(${variableName})`
    },
    addLayout: () => {
      // TODO
    },
    addUtility: (prefix, _properties, values, responsive = false) => {
      utilities.push({
        prefix,
        properties: Array.isArray(_properties) ? _properties : [_properties],
        values,
        responsive,
      })
    },
    tokensForNamespace: (namespace) => {
      return tokens.filter((t) => t.namespace === namespace)
        .map(({ name, variableName }) => ({ name, value: `var(${variableName})` }))
    },
    buildTokenCode: ({ Declaration, Rule }) => {
      return new Rule({ selector: ':root' }).append(tokens.map((token) => {
        return new Declaration({ prop: token.variableName, value: token.value })
      }))
    },
    buildUtilitiesCode: ({ Declaration, Rule, AtRule }) => {
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
