<template>
  <div v-bind="$attrs">
    <div
      v-for="({ label, value: val }, index) in options"
      :key="index"
      class="field radio-field"
    >
      <b-radio
        :value="value"
        :native-value="val"
        @input="$emit('input', $event)"
      >
        {{ label }}
      </b-radio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioWidget',
  props: {
    value: {
      type: [Array, Boolean, Number, String],
      default: undefined
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.radio-field {
  padding-left: .75em;
}
.radio-field:not(:last-child) {
  margin-bottom: .75rem;
}
</style>
