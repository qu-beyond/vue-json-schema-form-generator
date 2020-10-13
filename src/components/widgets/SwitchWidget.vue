<template>
  <b-switch
    :value="value"
    type="is-success"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span class="switch-label">
      <slot name="default">
        <template v-for="option in options">
          <template v-if="value === option.value">
            {{ option.label }}
          </template>
        </template>
      </slot>
    </span>
  </b-switch>
</template>

<script>
export default {
  name: 'SwitchWidget',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => [],
      validator(value) {
        return value && value.length == 2
      }
    }
  }
}
</script>

<style scoped>
.switch-label {
  display: block;
  padding-left: 10px;
}
</style>
