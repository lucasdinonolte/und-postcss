const escapeClassName = require('../../src/util/escapeClassName')

describe('Escape Classname', () => {
  it('should escape slashes in fractions correctly', () => {
    expect(escapeClassName('w-1/2')).toEqual('w-1\\/2')
  })

  it('should handle responsive utility class names correctly', () => {
    expect(escapeClassName('md:w-1/2')).toEqual('md\\:w-1\\/2')
  })
})
