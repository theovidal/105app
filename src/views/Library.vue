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
        <v-row
          v-else
          style="flex-direction: column"
          class="mx-0 px-2"
          align="center">
          <v-img
            width="20vw"
            src="/img/illustrations/not-found.svg"
            alt="Not found"/>
          <p class="title">Votre bibliothèque est vide</p>
          <p class="subtitle text-center">Complétez-la à l'aide de l'icône en haut à droite de n'importe quelle fiche !</p>
        </v-row>
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
