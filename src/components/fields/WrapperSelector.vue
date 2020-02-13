<template>
  <component
    :is="wrapperType"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'WrapperSelector',
  props: {
    wrappers: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    wrapperType() {
      let type = this.wrappers[this.type]
      return type ? type : this.wrappers['default']
    }
  }
}
</script>
