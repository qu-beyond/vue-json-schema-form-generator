<template>
  <fieldset>
    <b-field
      v-for="(item, index) in model"
      :key="index"
      grouped
      expanded
    >
      <b-field
        expanded
        class="is-marginless"
      >
        <schema-field
          :schema="schema.items"
          :definitions="definitions"
          :value="item"
          :error-schema="errorSchema[index]"
          :widgets="widgets"
          @input="updateValue($event, index)"
        />
      </b-field>
      <b-field>
        <b-tooltip
          label="Remove row"
          type="is-danger"
          position="is-left"
        >
          <b-button
            v-if="model.length > 0"
            :key="`remove-${index}`"
            class="is-danger"
            icon-left="trash-alt"
            expanded
            @click="deleteValue(index)"
          />
        </b-tooltip>
      </b-field>
    </b-field>
    <b-field
      grouped
      position="is-right"
    >
      <b-tooltip
        label="Add new row"
        type="is-info"
        position="is-left"
      >
        <b-button
          type="is-info"
          icon-left="plus"
          @click="addItem()"
        />
      </b-tooltip>
    </b-field>
  </fieldset>
</template>

<script>
// TODO: add fixed fields and additional items
import { getDefaultFormState, isFixedItems, allowAdditionalItems } from '../../utils/helpers'
import FieldBaseMixin from '../mixins/FieldBaseMixin'

export default {
  name: 'ArrayField',
  components: {
    // load at runtime to avoid circular dependency https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
    SchemaField: () => import('./SchemaField')
  },
  mixins: [FieldBaseMixin({ type: Array, default: () => ([]) })],
  props: {
    definitions: {
      type: Object,
      default: () => ({})
    },
    errorSchema: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    addItem() {
      this.model = [...this.model, this.getNewFormDataRow()]
    },
    updateValue(value, index) {
      const newModel = [...this.model]
      newModel.splice(index, 1, value)
      this.model = newModel
    },
    deleteValue(index){
      const newModel = [...this.model]
      newModel.splice(index, 1)
      this.model = newModel
    },
    getNewFormDataRow() {
      const { schema } = this
      let itemSchema = schema.items
      if (isFixedItems(schema) && allowAdditionalItems(schema)) {
        itemSchema = schema.additionalItems
      }
      return getDefaultFormState(itemSchema, undefined, this.definitions)
    }
  }
}
</script>

<style scoped>
.columns {
  padding-bottom: .75em;
}
.column {
  padding: 0;
}
.left-column {
  padding-right: 1em;
}
</style>
