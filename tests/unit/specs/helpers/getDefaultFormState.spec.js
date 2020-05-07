import { getDefaultFormState } from '../../../../src/utils/helpers'

describe('getDefaultFormState()', () => {
  describe('root default', () => {
    it('should map root schema default to form state, if any', () => {
      expect(
        getDefaultFormState({
          type: 'string',
          default: 'foo'
        })
      ).toBe('foo')
    })

    it('should keep existing form data that is equal to 0', () => {
      expect(
        getDefaultFormState(
          {
            type: 'number',
            default: 1
          },
          0
        )
      ).toBe(0)
    })

    it('should keep existing form data that is equal to false', () => {
      expect(
        getDefaultFormState(
          {
            type: 'boolean'
          },
          false
        )
      ).toBe(false)
    })

    const noneValues = [null, undefined, NaN]
    noneValues.forEach(noneValue => {
      it('should overwrite existing form data that is equal to a none value', () => {
        expect(
          getDefaultFormState(
            {
              type: 'number',
              default: 1
            },
            noneValue
          )
        ).toBe(1)
      })
    })
  })
})
