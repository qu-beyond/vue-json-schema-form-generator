<template>
  <div class="object-wrapper">
    <legend
      v-if="label"
      class="title"
    >
      {{ label }}
    </legend>
    <div
      v-if="description"
      class="content"
    >
      {{ description }}
    </div>
    <slot name="default" />
  </div>
</template>

<script>
export default {
  name: 'ObjectWrapper',
  props: {
    label: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.object-wrapper {
  padding-bottom: .75rem;
}
.title {
  margin-bottom: .75rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.125;
}
</style>
<style>
.object-wrapper .field:not(:last-child) {
  margin-bottom: 0.75rem;
}
</style>
