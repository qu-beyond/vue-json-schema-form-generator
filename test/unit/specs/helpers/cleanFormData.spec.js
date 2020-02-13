import { cleanFormData } from '../../../../src/utils/helpers'

describe('cleanFormData()', () => {
  it('should omit properties don\'t specified in schema', () => {
    const schema = {
      type: 'object',
      properties: {
        'a.b': {
          title: 'A-B',
          type: 'string'
        },
        'c.d': {
          title: 'C-D',
          type: 'string'
        },
        boolean: {
          title: 'Switch',
          type: 'boolean'
        }
      }
    }
    const result = cleanFormData(schema, { 'a.b': 'yay', toBeCleaned: 'bye bye', boolean: false })
    expect(result.toBeCleaned).toBeUndefined()
    expect(result['a.b']).toBe('yay')
    expect(result.boolean).toBe(false)
  })
})