<template>
  <main>
    <v-app-bar
      app
      dense
      hide-on-scroll>
      <template v-if="zoomMenu">
        <v-btn
          icon
          @click="zoomMenu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-slider
          v-model="zoom"
          style="height: 30px"
          min="0"
          max="100"/>
      </template>
      <template v-else>
        <v-dialog
          v-model="infoDialog"
          width="500">
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <v-tooltip
                right>
                <template #activator="{ on }">
                  <v-btn
                    icon
                    v-on="on">
                    <v-icon>mdi-information-outline</v-icon>
                  </v-btn>
                </template>
                <span>Informations</span>
              </v-tooltip>
            </div>
          </template>
          <v-card>
            <v-card-text class="pt-4">
              <strong>Nom : </strong>{{ file.name }}<br>

              <strong>Description : </strong>{{ file.description }}<br>

              <strong>Matière : </strong>
              <v-icon>{{ subject.icon }}</v-icon>
              {{ subject.name }}<br>
            </v-card-text>

            <v-divider/>

            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="primary"
                text
                @click="infoDialog = false">
                Fermer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-tooltip
          bottom>
          <template #activator="{ on }">
            <v-btn
              icon
              v-on="on"
              @click="zoomMenu = true">
              <v-icon>mdi-magnify-plus-outline</v-icon>
            </v-btn>
          </template>
          <span>Niveau de zoom</span>
        </v-tooltip>
        <v-spacer/>
        <v-tooltip
          left>
          <template #activator="{ on }">
            <v-btn
              :href="url"
              target="_blank"
              icon
              v-on="on">
              <v-icon>mdi-download-outline</v-icon>
            </v-btn>
          </template>
          <span>Télécharger</span>
        </v-tooltip>
      </template>
    </v-app-bar>
    <v-row justify="center">
      <pdf
        v-for="i in numPages"
        :key="i"
        :src="src"
        :page="i"
        :style="style"/>
    </v-row>
    <v-footer>
      <v-spacer/>
      <div>&copy; {{ new Date().getFullYear() }}, Théo Vidal</div>
    </v-footer>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import pdf from 'vue-pdf'

export default {
  name: 'File',
  components: { pdf },
  data () {
    return {
      subject: {},
      file: {},
      src: '',
      url: '',

      zoom: 100,
      numPages: undefined,

      zoomMenu: false,
      infoDialog: false
    }
  },
  mounted () {
    this.subject = this.getSubjectBySlug(this.$route.params.subject)
    this.file = this.getFileBySlug(this.$route.params.file)
    this.url = `/files/${this.subject.slug}/${this.file.slug}.pdf`

    this.src = pdf.createLoadingTask(this.url)

    this.src.then(pdf => {
      this.numPages = pdf.numPages;
    })
  },
  computed: {
    ...mapGetters(['getSubjectBySlug', 'getFileBySlug']),
    style () {
      return `width: ${this.zoom}%`
    }
  }
}
</script>

<style scoped>

</style>