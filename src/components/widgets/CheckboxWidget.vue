<template>
  <b-checkbox
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span class="checkbox-label">
      <slot name="default" />
    </span>
  </b-checkbox>
</template>

<script>
export default {
  name: 'CheckboxWidget'
}
</script>

<style scoped>
.checkbox-label {
  display: block;
  padding-left: 10px;
}
</style>
