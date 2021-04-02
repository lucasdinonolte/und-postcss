module.exports = {
  colors: {
    black: "#000000",
    red: "#FF0000",
    blue: "#0000FF",
    active: "var(--color-blue)",
  },
  layout: {
    minWidth: 320,
    maxWidth: 1440,
    spacing: {
      flush: 0,
      xxs: 0.25,
      xs: 0.5,
      sm: 0.75,
      md: 1,
      lg: 1.5,
      xl: 2,
      xxl: 3,
      xxxl: 4,
      xxxxl: 6,
    },
    defaultSpacing: 1,
    spacingInterpolations: [
    ],
  },
  typography: {
    scale: {
      minSize: 16,
      minRatio: 1.2,
      maxSize: 20,
      maxRatio: 1.33,
      stepsAbove: 4,
      stepsBelow: 2,
    },
    leading: {
      none: 1,
      tight: 1.2,
      normal: 1.4,
      loose: 1.5,
    },
    tracking: {
      tight: -0.01,
      normal: 0,
      wide: 0.01,
      loose: 0.075,
    },
  },
  namespaces: {
    layouts: 'o-',
    utilities: '',
  },
  breakpoints: {
    sm: 520,
  },
  utilities: [{
    prefix: 'd',
    properties: ['display'],
    values: [{
      name: 'n',
      value: 'none',
    }, {
      name: 'f',
      value: 'flex',
    }],
  }],
}
