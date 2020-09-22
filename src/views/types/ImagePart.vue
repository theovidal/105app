<template>
  <v-img
    :src="url"
    :alt="part.name"
    :style="style"/>
</template>

<script>
import settings from '@/data/settings'

export default {
  name: 'Image',
  props: {
    file: Object,
    part: Object,

    zoom: Number
  },
  computed: {
    url() {
      return `${settings.assetsRoot}/${this.file.subject}/${this.file.slug}/${this.part.slug}.${this.part.format}`
    },
    style() {
      return `max-width: ${this.zoom}% !important; height: auto`
    }
  }
}
</script>
