<template>
  <schema-field
    ref="formElement"
    :value="item"
    :schema="schema"
    :definitions="schema.definitions"
    :error-schema="errorSchema"
    :widgets="widgets"
    @input="handleChange"
  />
</template>

<script>
import SchemaField from './fields/SchemaField'
import { getDefaultFormState, cleanFormData, checkValue } from '../utils/helpers'
import { validateFormData, hasErrors } from '../utils/validate'

export default {
  name: 'SchemaForm',
  components: {
    SchemaField
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: {
      type: [Object, Array, Number, String, Boolean],
      default: undefined
    },
    noValidate: {
      type: Boolean,
      default: false
    },
    liveValidate: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: false
    },
    transformErrors: {
      type: Function,
      default: null
    },
    widgets: {
      type: Object,
      default: () => ({})
    },
    omitExtraData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      item: undefined,
      errorSchema: {}
    }
  },
  watch: {
    schema: 'updateItem'
  },
  created() {
    this.updateItem()
    this.$emit('input', this.item)
  },
  methods: {
    handleChange(val) {
      if (this.omitExtraData) {
        val = cleanFormData(this.schema, val)
      }

      this.item = val
      if (!this.noValidate && this.liveValidate) {
        this.checkValidity()
      }

      this.$emit('input', val)
    },
    checkValidity() {
      const { errorSchema } = validateFormData(this.item, this.schema, null, this.transformErrors)
      this.errorSchema = errorSchema
      const isValid = !hasErrors(errorSchema)
      this.$emit('update:isValid', isValid)
      return isValid
    },
    updateItem() {
      let value = checkValue(this.schema, this.value)

      if (this.omitExtraData) {
        value = cleanFormData(this.schema, value)
      }
      this.item = getDefaultFormState(this.schema, value, this.schema.definitions)
    }
  }
}
</script>
