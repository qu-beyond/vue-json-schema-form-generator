<template>
  <b-datepicker
    v-model="date"
    v-bind="$attrs"
    ref="datepicker"
    icon="calendar-alt"
    expanded
    trap-focus
  >
    <p
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
  </b-datepicker>
</template>

<script>
import { pad } from '../../utils/helpers'

export default {
  name: 'DateWidget',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  computed: {
    date: {
      get() {
        if (!this.value) {
          return undefined
        }
        const d = new Date(this.value.split('T')[0])
        const day = d.getUTCDate()
        const month = d.getUTCMonth()
        const year = d.getUTCFullYear()

        return new Date(year, month, day)
      },
      set(val) {
        let payload = val
        if (val instanceof Date) {
          payload = pad(val.getFullYear(), 4) +
            '-' + pad(val.getMonth() + 1, 2) +
            '-' + pad(val.getDate(), 2)
        }
        this.$emit('input', payload)
      }
    }
  }
}
</script>
