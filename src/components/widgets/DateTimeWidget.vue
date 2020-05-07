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
        if (!this.value) {
          return undefined
        }
        console.log('get -> this.value', this.value)
        return new Date(this.value.split('.')[0])
      },
      set(val) {
        let payload = val
        if (val instanceof Date) {
          payload = val.getFullYear() +
            '-' + pad(val.getMonth() + 1) +
            '-' + pad(val.getDate()) +
            'T' + pad(val.getHours()) +
            ':' + pad(val.getMinutes())
        }
        this.$emit('input', payload)
      }
    }
  }
}

function pad(number) {
  if (number < 10) {
    return `0${number}`
  }
  return number.toString()
}
</script>
