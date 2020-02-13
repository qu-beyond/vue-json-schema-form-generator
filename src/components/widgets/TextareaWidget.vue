<template>
  <b-input
    v-bind="$attrs"
    :use-html5validation="false"
    type="textarea"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'TextareaWidget'
}
</script>
