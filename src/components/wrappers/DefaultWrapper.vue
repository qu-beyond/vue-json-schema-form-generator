<template>
  <b-field
    :label="(label || '') + (required ? ' *' : '')"
    :message="message"
    :type="{ 'is-danger': errors.length }"
    horizontal
  >
    <slot />
  </b-field>
</template>

<script>
export default {
  name: 'DefaultWrapper',
  props: {
    label: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    errorMessages() {
      return this.errors.join('\n')
    },
    message() {
      return this.errorMessages || this.description
    }
  }
}
</script>