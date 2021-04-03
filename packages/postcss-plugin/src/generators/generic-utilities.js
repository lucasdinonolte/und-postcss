module.exports = (utilities) => {
  return {
    addUtilities: ({ addUtility }) => {
      Object.keys(utilities).forEach((prefix) => {
        const util = utilities[prefix]
        addUtility(prefix, util.property, Object.keys(util.values).map((val) => ({
          name: val,
          value: util.values[val], 
        })), !!util.responsive)
      })
    },
  }
}
