<template>
  <component
    :is="widget"
    v-model="model"
    v-bind="uiOptions"
    :options="options"
  >
    <template v-if="schema.title">
      {{ schema.title }}
    </template>
  </component>
</template>

<script>
import FieldBaseMixin from '../mixins/FieldBaseMixin'
import { optionsList, getWidget } from '../../utils/helpers'

export default {
  name: 'BooleanField',
  mixins: [FieldBaseMixin({ type: Boolean, default: undefined }, Boolean)],
  computed: {
    widget() {
      const { widget = 'switch' } = this.uiOptions
      return getWidget(this.schema, widget, this.widgets)
    },
    options() {
      const { schema } = this
      if (Array.isArray(schema.oneOf)) {
        return optionsList({
          oneOf: schema.oneOf.map(option => ({
            ...option,
            title: option.title || (option.const === true ? 'yes' : 'no')
          }))
        })
      }
      return optionsList({
        enum: schema.enum || [true, false],
        enumNames:
          schema.enumNames ||
          (schema.enum && schema.enum[0] === false
            ? ['no', 'yes']
            : ['yes', 'no'])
      })
    }
  }
}
</script>
