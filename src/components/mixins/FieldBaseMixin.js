import { getUiOptions } from '../../utils/helpers'

export default function(Type, cast = a => a) {
  return {
    props: {
      schema: {
        type: Object,
        required: true
      },
      value: Type,
      widgets: {
        type: Object,
        required: true
      }
    },
    computed: {
      model: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', cast(val))
        }
      },
      uiOptions() {
        return getUiOptions(this.schema)
      }
    }
  }

}