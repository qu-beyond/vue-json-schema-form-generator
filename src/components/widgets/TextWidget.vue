<template>
  <b-input
    v-bind="$attrs"
    :use-html5validation="false"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'TextWidget'
}
</script>
