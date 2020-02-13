<template>
  <b-input
    v-bind="$attrs"
    :use-html5validation="false"
    type="color"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'ColorWidget'
}
</script>
