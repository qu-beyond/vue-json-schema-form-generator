<template>
  <div>
    <schema-field
      v-for="(child, key) in schema.properties"
      :key="key"
      :label="isAdditional(child) && key"
      :schema="child"
      :definitions="definitions"
      :value="internalValue[key]"
      :required="isRequired(key)"
      :error-schema="errorSchema[key]"
      :widgets="widgets"
      @input="updateValue($event, key)"
      @update:label="handleLabelChange($event, key)"
      @delete="handleDelete(key)"
    />
    <div
      v-if="canExpand()"
      class="columns is-paddingless"
    >
      <div class="column is-3 is-offset-9">
        <b-tooltip
          label="Add property"
          type="is-info"
          style="width: 100%;"
        >
          <b-button
            type="is-info is-fullwidth"
            icon-left="plus"
            @click="handleAdd"
          />
        </b-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  getUiOptions,
  ADDITIONAL_PROPERTY_FLAG,
  hasOwnProperty
} from '../../utils/helpers'

export default {
  name: 'ObjectField',
  components: {
    // load at runtime to avoid circular dependency https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
    SchemaField: () => import('./SchemaField')
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    definitions: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    },
    errorSchema: {
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
      internalValue: {}
    }
  },
  methods: {
    isRequired(name) {
      const { schema } = this
      return (
        Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
      )
    },
    updateValue(value, child) {
      Vue.set(this.internalValue, child, value)
      this.$emit('input', this.internalValue)
    },
    canExpand() {
      const { value, schema } = this
      if (!schema.additionalProperties) {
        return false
      }
      const { expandable } = getUiOptions(schema)
      if (expandable === false) {
        return false
      }
      // if ui.expandable was not explicitly set to false, we can add
      // another property if we have not exceeded maxProperties yet
      if (schema.maxProperties !== undefined) {
        return Object.keys(value).length < schema.maxProperties
      }
      return true
    },
    handleAdd() {
      this.updateValue(undefined, this.getAvailableKey('newKey'))
    },
    handleLabelChange(newValue, oldValue) {
      if (newValue === oldValue) {
        return
      }
      newValue = this.getAvailableKey(newValue, this.internalValue)
      const newData = { ...this.internalValue }
      const newKeys = { [oldValue]: newValue }
      this.internalValue = {}
      Object.keys(newData).forEach(key => {
        const newKey = newKeys[key] || key
        Vue.set(this.internalValue, newKey, newData[key])
      })
      this.$emit('input', this.internalValue)
    },
    getAvailableKey(preferredKey) {
      var index = 0
      var newKey = preferredKey
      while (hasOwnProperty(this.internalValue, newKey)) {
        newKey = `${preferredKey}-${++index}`
      }
      return newKey
    },
    isAdditional(schema = {}) {
      return schema[ADDITIONAL_PROPERTY_FLAG]
    },
    handleDelete(key) {
      Vue.delete(this.internalValue, key)
      this.$emit('input', this.internalValue)
    }
  },
  watch: {
    value: {
      handler(value) {
       this.internalValue = value 
      },
      immediate: true
    }
  }
}
</script>
