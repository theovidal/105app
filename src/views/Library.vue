<template>
  <v-main class="contained">
    <top-banner title="Ma bibliothèque"/>
    <v-container>
      <v-row>
        <v-col
          v-if="getLibraryFiles.length"
          cols="12">
          <files-slider
            :files="getLibraryFiles"
            display-subject/>
        </v-col>
        <illustration
          v-else
          image="/img/illustrations/not-found.svg"
          title="Votre bibliothèque est vide"
          subtitle="Complétez-la à l'aide de l'icône en haut à droite de n'importe quelle fiche !"/>
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
