const colors = {
  black: '#000000',
  white: '#ffffff',
  blue: '#0000ff',
}

module.exports = {
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
    'bg-': {
      property: 'background-color',
      values: colors,
    },
    'text-': {
      property: 'color',
      values: colors,
    },
    'w-': {
      property: 'width',
      values: {
        'px': '1px',
        '1/4': '25%',
        '1/3': `${(1 / 3 * 100)}%`,
        '1/2': '50%',
        '2/3': `${(2 / 3 * 100)}%`,
        '3/4': '75%',
        'full': '100%',
      },
    },
  },
}
