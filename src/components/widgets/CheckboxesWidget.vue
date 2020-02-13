<template>
  <div class="checkboxes">
    <div
      v-for="({ label, value: val }, index) in options"
      :key="index"
      class="field checkbox-field"
    >
      <b-checkbox
        :value="value.indexOf(val) !== -1"
        type="is-info"
        expanded
        @input="updateValue($event, val)"
      >
        {{ label }}
      </b-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxesWidget',
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    optionsIndex() {
      return this.options.reduce((acc, { value }, index) => {
        acc[value] = index
        return acc
      }, {})
    },
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    updateValue(isSelected, value) {
      if (isSelected) {
        this.selectValue(value)
      } else {
        this.deselectValue(value)
      }
    },
    selectValue(value) {
      const { optionsIndex } = this
      let values = [ ...this.model, value ]
      values.sort((a, b) => optionsIndex[a] - optionsIndex[b])

      this.model = values
    },
    deselectValue(value) {
      this.model = this.model.filter(v => v !== value)
    }
  }
}
</script>

<style scoped>
.checkboxes {
  padding-top: .15em;
}
.checkbox-field {
  padding-left: .75em;
  line-height: 1;
}
.checkbox-field:not(:last-child) {
  margin-bottom: .75rem;
}
</style>
