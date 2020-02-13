<template>
  <div class="unsupported-field">
    <p>
      Unsupported field schema<!--
      --><span v-if="fieldId">
        for field <code>{{ fieldId }}</code>
      </span><!--
      --><template v-if="reason">
<!--
        -->: <em>{{ reason }}</em>
      </template>
    </p>
    <pre v-if="schema">{{ JSON.stringify(schema, null, 2) }}</pre>
  </div>
</template>

<script>
export default {
  name: 'UnsupportedField',
  props: {
    schema: {
      type: Object,
      required: true
    },
    fieldId: {
      type: String,
      default: undefined
    },
    reason: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.unsupported-field {
  padding-top: .375em;
}
pre {
  margin-top: .375em;
  padding: .625rem .75rem;
  border-radius: .375rem;
  border: 1px solid #dbdbdb;
}
</style>
