<template>
  <b-datetimepicker
    v-model="date"
    v-bind="$attrs"
    :timepicker="{ hourFormat: '12' }"
    ref="datepicker"
    icon="calendar-alt"
    trap-focus
  >
    <p
      slot="right"
      class="buttons is-right"
    >
      <b-button
        icon-left="trash-alt"
        type="is-danger"
        @click="date = null"
      >
        Clear
      </b-button>
      <b-button
        icon-left="times"
        @click="$refs.datepicker.toggle()"
      >
        Close
      </b-button>
    </p>
  </b-datetimepicker>
</template>

<script>
import { pad } from '../../utils/helpers'

export default {
  name: 'DateTimeWidget',
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  computed: {
    date: {
      get() {
        if (!this.value || typeof this.value != 'string') {
          return undefined
        }
        var d = new Date(this.value.split(/\.|Z/)[0])

        if (!isNaN(d)) {
          return d
        }
        return undefined
      },
      set(val) {
        if (val instanceof Date) {
          const payload  = pad(val.getFullYear(), 4) +
            '-' + pad(val.getMonth() + 1, 2) +
            '-' + pad(val.getDate(), 2) +
            'T' + pad(val.getHours(), 2) +
            ':' + pad(val.getMinutes(), 2) + ':00Z'
          this.$emit('input', payload)
          return
        }

        if (!val) {
          this.$emit('input', undefined)
        }
      }
    }
  }
}
</script>
