<template>
  <b-select
    :value="value"
    v-bind="$attrs"
    expanded
    v-on="$listeners"
  >
    <option
      v-for="{ label, value: val } in options"
      :key="val"
      :value="val"
    >
      {{ label }}
    </option>
  </b-select>
</template>

<script>
export default {
  name: 'SelectWidget',
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
