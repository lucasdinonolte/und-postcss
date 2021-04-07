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
    require('./generators/color')({
      black: "#000000",
      red: "#FF0000",
      blue: "#0000FF",
    }),
    require('./generators/spacing')({
      spaces: require('./util/fluidSpacingScale')({
        minWidth: 320,
        minFontSize: 16,
        maxWidth: 1440,
        maxFontSize: 20,
        spaces: {
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
      }),
      defaultSpacing: 1,
    }),
    require('./generators/typography')({
      sizes: require('./util/fluidTypeScale')({
        minWidth: 320,
        maxWidth: 1440,
        minSize: 16,
        minRatio: 1.2,
        maxSize: 20,
        maxRatio: 1.33,
        stepsAbove: 4,
        stepsBelow: 2,
      }),
      leading: {
        none: 1,
        tight: 1.2,
        normal: 1.4,
        loose: 1.5,
      },
      tracking: {
        tight: '-0.01em',
        normal: 0,
        wide: '0.01em',
        loose: '0.075em',
      },
      fontFamilies: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
    }),
    require('./generators/widths')({
      '1/2': '50%',
    }),
  ],
}
