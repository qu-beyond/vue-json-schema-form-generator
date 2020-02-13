<template>
  <component
    :is="widget"
    v-model="model"
    v-bind="{ ...uiOptions, ...rangeSpec(schema) }"
    :options="enumOptions"
  />
</template>

<script>
import ScalarFieldMixin from '../mixins/ScalarFieldMixin'
import { asNumber, rangeSpec } from '../../utils/helpers'

export default {
  name: 'NumberField',
  mixins: [ScalarFieldMixin({ type: [Number, String], default: undefined }, asNumber)],
  methods: {
    rangeSpec
  }
}
</script>
