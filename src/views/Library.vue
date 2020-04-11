<template>
  <v-content>
    <top-banner title="Librairie"/>
    <v-container class="contained">
      <v-row>
        <v-col
          v-for="list in library"
          :key="list.slug"
          cols="12">
          <p class="display-1 text--primary">
            <v-icon>{{ list.icon }}</v-icon>
            {{ list.name }}
          </p>
          <files-slider
            :files="getFiles(list.files)"
            display-subject/>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import TopBanner from './parts/TopBanner'
import FilesSlider from './parts/FilesSlider'

export default {
  name: 'Library',
  components: { TopBanner, FilesSlider },
  data () {
    return {
      library: {}
    }
  },
  mounted () {
    this.library = this.getLibrary
  },
  computed: {
    ...mapGetters(['getLibrary', 'getFileBySlug'])
  },
  methods: {
    getFiles (data) {
      let output = []
      data.forEach(file => {
        output.push(this.getFileBySlug(file.subject, file.slug))
      })
      return output
    }
  }
}
</script>
