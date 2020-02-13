<template>
  <b-field
    horizontal
    grouped
  >
    <b-field
      label-position="on-border"
      label="Key"
      expanded
    >
      <b-input
        v-model="internalLabel"
        expanded
      />
      <p class="control">
        <b-tooltip
          label="Commit key"
          type="is-primary"
          position="is-right"
        >
          <b-button
            :disabled="label === internalLabel"
            type="is-primary"
            icon-left="check"
            @click="$emit('update:label', internalLabel)"
          />
        </b-tooltip>
      </p>
    </b-field>
    <b-field
      :message="message"
      :type="{ 'is-danger': errors.length }"
      label-position="on-border"
      label="Value"
      expanded
    >
      <slot name="default" />
    </b-field>
    <b-field>
      <b-tooltip
        label="Delete property"
        type="is-danger"
        position="is-left"
      >
        <b-button
          icon-left="trash-alt"
          type="is-danger"
          @click="$emit('delete')"
        />
      </b-tooltip>
    </b-field>
  </b-field>
</template>

<script>
export default {
  name: 'AdditionalPropWrapper',
  props: {
    label: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      internalLabel: this.label || ''
    }
  },
  computed: {
    errorMessages() {
      return this.errors.join('\n')
    },
    message() {
      return this.errorMessages || this.description
    }
  }
}
</script>