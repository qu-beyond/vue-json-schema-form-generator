<template>
  <default-wrapper
    v-bind="$attrs"
    :label="internalLabel"
  >
    <slot />
  </default-wrapper>
</template>

<script>
import DefaultWrapper from './DefaultWrapper'

export default {
  name: 'BooleanWrapper',
  components: { DefaultWrapper },
  props: {
    schema: {
      type: Object,
      required: true
    }
  },
  computed: {
    internalLabel() {
      const { ui: { widget } = {} } = this.schema
      if (!widget || widget === 'checkbox') {
        return ''
      }
      return this.$attrs.label
    }
  }
}
</script>