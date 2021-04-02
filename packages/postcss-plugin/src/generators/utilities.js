module.exports = ({ config, tokens }) => {
  const utilities = config.utilities

  const wrapInVar = (varName) => `var(${varName})`

  const getValuesForNamespace = (_tokens, namespace) => {
    return _tokens.filter((t) => t.namespace === namespace)
      .map(({ name, variableName }) => ({ name, value: wrapInVar(variableName) }))
  }

  const addUtility = (prefix, _properties, values) => {
    utilities.push({
      prefix,
      properties: Array.isArray(_properties) ? _properties : [_properties],
      values,
    })
  }

  const fontSizes = getValuesForNamespace(tokens, 'font')
  const colors = getValuesForNamespace(tokens, 'color')
  const spacings = getValuesForNamespace(tokens, 'space')

  addUtility('text-', 'color', colors)
  addUtility('bg-', 'background-color', colors)

  addUtility('text-', 'font-size', fontSizes)

  addUtility('p-', 'padding', spacings)
  addUtility('pt-', 'padding-top', spacings)
  addUtility('pr-', 'padding-right', spacings)
  addUtility('pb-', 'padding-bottom', spacings)
  addUtility('pl-', 'padding-left', spacings)
  addUtility('px-', ['padding-left', 'padding-right'], spacings)
  addUtility('py-', ['padding-top', 'padding-bottom'], spacings)

  addUtility('m-', 'margin', spacings)
  addUtility('mt-', 'margin-top', spacings)
  addUtility('mr-', 'margin-right', spacings)
  addUtility('mb-', 'margin-bottom', spacings)
  addUtility('ml-', 'margin-left', spacings)
  addUtility('mx-', ['margin-left', 'margin-right'], spacings)
  addUtility('my-', ['margin-top', 'margin-bottom'], spacings)

  return utilities
}
