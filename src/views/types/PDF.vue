<template>
  <object
    :data="url"
    type="application/pdf"
    width="100%"
    :style="style">
    <iframe
      :src="url"
      width="100%">
      <p>This browser does not support PDF!</p>
    </iframe>
  </object>
</template>

<script>
import settings from '@/data/settings'
import { getHexa } from '@/utils/color'

export default {
  name: 'PDF',
  props: {
    file: Object,
    subject: Object,
    part: Object,
  },
  computed: {
    url() {
      return `${settings.assetsRoot}/${this.subject.slug}/${this.file.slug}/${this.part.slug}${this.$vuetify.theme.dark && this.file.dark !== undefined ? '--dark' : ''}.pdf`
    },
    style() {
      return {
        height: [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod'
        ].includes(navigator.platform)
          // iPad on iOS 13 detection
          || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
          ? 'auto' : '100vh',
        width: `${this.zoom}vw`
      }
    }
  },
  methods: { getHexa }
}
</script>

<style>
  object {
    background-color: var(--v-background-base);
  }
</style>
