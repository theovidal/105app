<template>
  <div>
    <!-- TODO: repair PDF rotation
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          color="primary"
          absolute
          small
          fab
          v-on="on"
          @click="rotate += 90">
          <v-icon>mdi-rotate-right</v-icon>
        </v-btn>
      </template>
      <span>Rotation de la page</span>
    </v-tooltip>-->
    <v-container v-if="!loaded">
      <v-progress-linear
        indeterminate
        :color="getHexa(subject.color)"/>
    </v-container>
    <pdf
      v-for="i in numPages"
      :key="`${file.subject}/${file.slug}--${i}`"
      :src="src"
      :page="i"
      :rotate="rotate"
      :style="style"/>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

import settings from '@/data/settings'
import { getHexa } from '@/utils/color'

export default {
  name: 'PDF',
  components: { pdf },
  props: {
    file: Object,
    subject: Object,
    part: Object,

    zoom: Number
  },
  data() {
    return {
      src: '',
      rotate: 0,
      numPages: undefined,
      loaded: false,
    }
  },
  mounted() {
    let url = this.url
    if (this.$vuetify.theme.dark && this.file.dark !== undefined) url += '--dark'
    this.src = pdf.createLoadingTask(url + '.pdf')

    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages
      this.loaded = true
    })
  },
  computed: {
    url() {
      return `${settings.assetsRoot}/${this.subject.slug}/${this.file.slug}/${this.part.slug}`
    },
    style() {
      return `width: ${this.zoom}vw`
    }
  },
  methods: { getHexa }
}
</script>
