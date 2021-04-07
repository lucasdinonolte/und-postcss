module.exports = {
  settings: {
    responsiveUtilities: false,
  },
  namespaces: {
    layouts: 'l-',
    utilities: '',
  },
  breakpoints: {
    sm: 640,
    md: 920,
    lg: 1200,
    xl: 1440,
  },
  tokens: {
    layout: {
      header: {
        height: '5rem',
      },
    },
  },
  utilities: {
    d: {
      property: 'display',
      values: {
        n: 'none',
        f: 'flex',
        i: 'inline',
        g: 'grid',
      },
    },
  },
  generators: [
  ],
}
