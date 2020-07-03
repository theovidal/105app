<template>
  <v-main>
    <top-banner title="Ma bibliothèque"/>
    <v-container class="contained">
      <template v-if="getLibraryFiles.length">
        <v-row>
          <v-col cols="12">
            <v-btn
              outlined
              color="primary"
              @click="edit = !edit">
              <template v-if="edit">
                <v-icon left>mdi-check-outline</v-icon>
                Terminer
              </template>
              <template v-else>
                <v-icon left>mdi-pencil-outline</v-icon>
                Éditer
              </template>
            </v-btn>
          </v-col>
        </v-row>
        <files-grid
          :files="getLibraryFiles"
          :readonly="edit"
          display-subject>
          <template #card="{ file }">
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-btn
                  v-if="edit"
                  absolute
                  small
                  dark
                  fab
                  top
                  right
                  color="error"
                  v-on="on"
                  @click="removeFileFromLibrary({
                    subject: file.subject,
                    file: file.slug
                  })">
                  <v-icon>mdi-text-box-minus-outline</v-icon>
                </v-btn>
              </template>
              <span>Supprimer de la bibliothèque</span>
            </v-tooltip>
          </template>
        </files-grid>
      </template>
      <illustration
        v-else
        image="/img/illustrations/not-found.svg"
        title="Votre bibliothèque est vide"
        subtitle="Complétez-la à l'aide de l'icône en haut à droite de n'importe quelle fiche !"/>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TopBanner from '@/views/parts/TopBanner'
import FilesGrid from '@/views/parts/FilesGrid'

export default {
  name: 'Library',
  data() {
    return {
      edit: false
    }
  },
  components: { FilesGrid, TopBanner },
  computed: mapGetters(['getLibraryFiles', 'getSubjectBySlug']),
  methods: mapActions(['removeFileFromLibrary'])
}
</script>
