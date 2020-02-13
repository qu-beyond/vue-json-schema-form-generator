<template>
  <default-wrapper
    v-if="useDefaultWrapper"
    v-bind="$attrs"
    :errors="errors"
  >
    <slot name="default" />
  </default-wrapper>

  <object-wrapper
    v-else
    v-bind="$attrs"
  >
    <b-field
      :message="errorMessages"
      :type="{ 'is-danger': errors.length }"
    >
      <slot name="default" />
    </b-field>
  </object-wrapper>
</template>

<script>
import { isFilesArray, isMultiSelect, hasCustomWidget } from '../../utils/helpers'
import DefaultWrapper from './DefaultWrapper'
import ObjectWrapper from './ObjectWrapper'

export default {
  name: 'ArrayWrapper',
  components: { DefaultWrapper, ObjectWrapper },
  props: {
    schema: {
      type: Object,
      required: true
    },
    definitions: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    useDefaultWrapper() {
      const { schema, definitions } = this
      return isFilesArray(schema, definitions) || isMultiSelect(schema, definitions) || hasCustomWidget(schema)
    },
    errorMessages() {
      return this.errors.join('\n')
    }
  }
}
</script>
