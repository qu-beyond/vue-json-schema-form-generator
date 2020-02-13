<template>
  <b-input
    v-bind="$attrs"
    :use-html5validation="false"
    type="email"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'EmailWidget'
}
</script>
