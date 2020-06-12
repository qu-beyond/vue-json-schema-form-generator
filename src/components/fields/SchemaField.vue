<template>
  <wrapper-selector
    :type="wrapperType"
    :wrappers="wrappers"
    :label="internalLabel"
    :description="description"
    :errors="errors"
    :schema="processedSchema"
    :definitions="definitions"
    :required="required"
    v-on="$listeners"
  >
    <component
      :is="field"
      v-if="field"
      ref="component"
      v-model="model"
      :schema="processedSchema"
      :required="required"
      :definitions="definitions"
      :error-schema="errorSchema"
      :widgets="widgets"
    />
    <component
      :is="unsupported"
      v-else
      :schema="processedSchema"
      :reason="`Unknown field type ${processedSchema.type}`"
    />
  </wrapper-selector>
</template>

<script>
import WrapperSelector from './WrapperSelector'
import {
  retrieveSchema,
  getFieldComponent,
  ADDITIONAL_PROPERTY_FLAG,
  hasOwnProperty
} from '../../utils/helpers'
import { wrapperMap } from '../wrappers'

export default {
  name: 'SchemaField',
  components: { WrapperSelector },
  props: {
    schema: {
      type: Object,
      required: true
    },
    definitions: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [Object, String, Boolean, Number, Array],
      default: undefined
    },
    errorSchema: {
      type: Object,
      default: () => ({})
    },
    widgets: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    processedSchema() {
      return retrieveSchema(this.schema, this.definitions, this.value)
    },
    internalLabel() {
      return this.label || this.schema.title || this.processedSchema.title
    },
    description() {
      return this.schema.description || this.processedSchema.description
    },
    errors() {
      return this.errorSchema.__errors || []
    },
    field() {
      return getFieldComponent(this.processedSchema)
    },
    unsupported() {
      return getFieldComponent({ type: 'unsupported' })
    },
    wrappers() {
      return wrapperMap
    },
    wrapperType() {
      const additional = hasOwnProperty(
        this.processedSchema,
        ADDITIONAL_PROPERTY_FLAG
      )
      return additional ? 'additional' : this.processedSchema.type
    }
  }
}
</script>
