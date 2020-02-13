<template>
  <div>
    <section class="main-content columns">
      <div class="container column is-6">
        <b-field label="Generated Form">
          <schema-form
            ref="schemaForm"
            v-model="values"
            :schema="schema"
            :live-validate="liveValidate"
            :omit-extra-data="true"
            :transform-errors="transformErrors"
            :is-valid.sync="isValid"
            :widgets="widgets"
          />
        </b-field>
        <b-button @click="$refs.schemaForm.checkValidity(); liveValidate = true">Validate</b-button>
        is valid: {{ isValid }}
      </div>
      <div class="container column is-6">
        <b-field label="Schema">
          <b-input v-model="schemaString" type="textarea" rows="24" />
        </b-field>
      </div>
    </section>
    <section>
      <div class="container">
        <b-field label="Values">
          <pre>{{ valuesString }}</pre>
        </b-field>
      </div>
    </section>
  </div>
</template>

<script>
import CustomWidget from './CustomWidget.vue'
export default {
  name: 'App',

  data() {
    return {
      liveValidate: false,
      isValid: false,
      values: { lastName: 'Norris', boolean: false, booleanTrue: true, multiple_choice: [1,2,3,4,5] },

      schema: require('./schema.json'),
      widgets: { custom: CustomWidget }
    }
  },
  computed: {
    schemaString: {
      get() {
        return JSON.stringify(this.schema, null, 4)
      },
      set(val) {
        try {
          this.schema = JSON.parse(val)
        } catch (error) {
          // do nothing
        }
      }
    },
    valuesString() {
      return JSON.stringify(this.values, null, 4)
    }
  },
  methods: {
    transformErrors(errors) {
      return errors.map(({ message, title, ...e }) => ({ ...e, message: `${title || 'Field'} ${message}` }))
    }
  }
}
</script>
