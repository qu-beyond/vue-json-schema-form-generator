<template>
  <b-switch
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span class="switch-label">
      <slot name="default" />
    </span>
  </b-switch>
</template>

<script>
export default {
  name: 'SwitchWidget'
}
</script>

<style scoped>
.switch-label {
  display: block;
  padding-left: 10px;
}
</style>
