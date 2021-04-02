const wrapInVar = require('../util/wrapInVar')

module.exports = (tokens, namespace) => {
    return tokens.filter((t) => t.namespace === namespace)
      .map(({ name, variableName }) => ({ name, value: wrapInVar(variableName) }))
}
