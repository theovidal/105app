<template>
  <v-main class="contained">
    <top-banner
      title="Ma bibliothèque"
      icon="mdi-file-document-multiple-outline"/>
    <v-container>
      <v-row>
        <v-col cols="12">
          <files-slider
            :files="getLibraryFiles"
            display-subject/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import TopBanner from '@/views/parts/TopBanner'
import FilesSlider from '@/views/parts/FilesSlider'

export default {
  name: 'Library',
  components: { TopBanner, FilesSlider },
  computed: mapGetters(['getLibraryFiles']),
}
</script>
