<template>
  <component
    :is="widget"
    v-model.trim="model"
    v-bind="uiOptions"
    :options="enumOptions"
  />
</template>

<script>
import ScalarFieldMixin from '../mixins/ScalarFieldMixin'

export default {
  name: 'StringField',
  mixins: [ScalarFieldMixin(
    {
      type: String,
      default: undefined
    },
    s => !s || s.trim() === '' ? undefined : s
  )]
}
</script>
