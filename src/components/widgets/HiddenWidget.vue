<template>
  <b-input
    :value="value"
    type="hidden"
  />
</template>

<script>
export default {
  name: 'HiddenWidget',
  props: {
    value: {
      type: [Boolean, Number, String],
      default: undefined
    }
  }
}
</script>
