<template>
  <div>
    <b-upload
      v-model="files"
      :multiple="multiple"
      :accept="accept"
      @input="handleChange"
    >
      <a
        class="button"
        :class="type"
      >
        <b-icon
          :pack="iconPack"
          :icon="icon"
        />
        <span>{{ label }}</span>
      </a>
    </b-upload>
    <ul class="file-info">
      <li
        v-for="({ name, size, type: fileType }, key) in filesInfo"
        :key="key"
      >
        <strong>{{ name }}</strong> ({{ fileType }}, {{ size }} bytes)
      </li>
    </ul>
  </div>
</template>

<script>
// TODO: add a way to remove a file from the list or remove all
import { dataURItoBlob } from '../../utils/helpers'

export default {
  name: 'FileWidget',
  props: {
    value: {
      type: [Array, String],
      default: undefined
    },
    label: {
      type: String,
      default: 'Click to upload'
    },
    type: {
      type: String,
      default: 'is-primary'
    },
    icon: {
      type: String,
      default: 'upload'
    },
    iconPack: {
      type: String,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      files: undefined
    }
  },
  computed: {
    filesInfo() {
      const values = Array.isArray(this.value) ? this.value : [this.value]
      return this.extractFileInfo(values)
    }
  },
  methods: {
    handleChange(files) {
      if (!this.multiple) {
        this.processFile(files).then(fileInfo => {
          this.$emit('input', fileInfo.dataURL)
        })
      } else {
        this.processFiles(files).then(filesInfo => {
          const values = filesInfo.map(fileInfo => fileInfo.dataURL)
          this.$emit('input', values)
        })
      }
    },

    extractFileInfo(dataURLs) {
      return dataURLs
        .filter(dataURL => typeof dataURL !== 'undefined')
        .map(dataURL => {
          const { blob, name } = dataURItoBlob(dataURL)
          return {
            name: name,
            size: blob.size,
            type: blob.type,
          }
        })
    },

    addNameToDataURL(dataURL, name) {
      return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`)
    },

    processFile(file) {
      const { name, size, type } = file
      return new Promise((resolve, reject) => {
        const reader = new window.FileReader()
        reader.onerror = reject
        reader.onload = event => {
          resolve({
            dataURL: this.addNameToDataURL(event.target.result, name),
            name,
            size,
            type,
          })
        }
        reader.readAsDataURL(file)
      })
    },

    processFiles(files) {
      return Promise.all([].map.call(files, f => this.processFile(f)))
    }
  }
}
</script>
