<template>
  <div>
    <component
      :is="unsupportedField"
      v-if="unsupportedError"
      :schema="schema"
      :reason="unsupportedError"
    />
    <component
      :is="widget"
      v-else-if="widget"
      :schema="schema"
      :definitions="definitions"
      :options="enumOptions"
      v-bind="{ ...uiOptions, ...$attrs }"
      multiple
      v-on="$listeners"
    />
    <array-field
      v-else
      v-bind="$attrs"
      :schema="schema"
      :definitions="definitions"
      :widgets="widgets"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import {
  isFilesArray,
  isMultiSelect,
  getUiOptions,
  getWidget,
  getFieldComponent,
  optionsList,
  resolveSchema
} from '../../utils/helpers'
import ArrayField from './ArrayField'

export default {
  name: 'ArrayFieldSelector',
  components: { ArrayField },
  props: {
    schema: {
      type: Object,
      required: true
    },
    definitions: {
      type: Object,
      default: () => ({})
    },
    widgets: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      unsupportedError: undefined
    }
  },
  computed: {
    processedSchema() {
      return resolveSchema(this.schema, this.definitions, this.value)
    },
    isFilesArray() {
      return isFilesArray(this.processedSchema, this.definitions)
    },
    isMultiSelect() {
      return isMultiSelect(this.processedSchema, this.definitions)
    },
    widget() {
      if (this.isMultiSelect || this.isFilesArray || this.uiOptions.widget) {
        return this.getWidget()
      }
      return undefined
    },
    uiOptions() {
      return getUiOptions(this.schema)
    },
    enumOptions() {
      if (this.isMultiSelect) {
        return optionsList(this.schema.items)
      }
      return undefined
    },
    unsupportedField() {
      return getFieldComponent({ type: 'unsupported' })
    }
  },
  methods: {
    updateValue(value, index) {
      this.model.splice(index, 1, value)
      this.$emit('input', this.model)
    },
    getWidget() {
      const defaultWidget = this.isFilesArray ? 'files' : 'checkboxes'
      const { widget = defaultWidget } = this.uiOptions
      try {
        return getWidget(this.schema, widget, this.widgets)
      } catch (error) {
        this.unsupportedError = error
        return undefined
      }
    }
  }
}
</script>
