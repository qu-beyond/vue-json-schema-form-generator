<template>
  <b-input
    v-bind="$attrs"
    :use-html5validation="false"
    type="password"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'PasswordWidget'
}
</script>
