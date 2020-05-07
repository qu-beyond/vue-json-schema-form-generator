<template>
  <b-field>
    <b-datetimepicker
      v-model="date"
      v-bind="$attrs"
      :timepicker="{ hourFormat: '12' }"
      icon="calendar-today"
      horizontal-time-picker
      trap-focus
    />
  </b-field>
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
