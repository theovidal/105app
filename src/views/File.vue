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
          min="10"
          max="100"/>
      </template>
      <template v-else>
        <v-tooltip
          bottom
          open-delay="500">
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
        <v-dialog
          v-model="infoDialog"
          width="500">
          <template v-slot:activator="{ on: dialog }">
            <v-tooltip
              bottom
              open-delay="500">
              <template #activator="{ on: tooltip }">
                <v-btn
                  icon
                  v-on="{ ...tooltip, ...dialog }">
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span>Informations</span>
            </v-tooltip>
          </template>
          <v-card>
            <v-card-text class="pt-4">
              <strong>Nom : </strong>{{ file.name }}<br>

              <strong>Description : </strong><span v-html="file.description"/><br>

              <strong>Ajoutée le : </strong>{{ dateToText(file.added) }}<br>

              <strong>Niveau (indicatif) : </strong>{{ file.level }}<br>

              <strong>Matière : </strong><v-icon>{{ subject.icon }}</v-icon> {{ subject.name }}<br>
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
        <v-spacer/>
        <v-menu
          transition="slide-y-transition"
          bottom>
          <template #activator="{ on: menu }">
            <v-tooltip
              left
              open-delay="500">
              <template #activator="{ on: tooltip }">
                <v-btn
                  icon
                  v-on="{...tooltip, ...menu }">
                  <v-icon>mdi-download-outline</v-icon>
                </v-btn>
              </template>
              <span>Télécharger</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item
              v-for="format in file.formats"
              :key="format"
              :href="url + format"
              target="_blank">
              <v-list-item-icon>
                <v-icon>
                  {{ formats[format].icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ formats[format].name }} (.{{ format }})</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </template>
    </v-app-bar>
    <v-row
      style="min-height: 85vh"
      justify="center">
      <pdf
        v-for="i in numPages"
        :key="i"
        :src="src"
        :page="i"
        :style="style"/>
    </v-row>
    <v-footer class="background">
      <v-spacer/>
      <div>&copy; {{ new Date().getFullYear() }}, Théo Vidal</div>
    </v-footer>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import pdf from 'vue-pdf'
import formats from '@/data/formats'
import { dateToText } from '@/utils/parsing'

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
      infoDialog: false,

      formats
    }
  },
  mounted () {
    this.subject = this.getSubjectBySlug(this.$route.params.subject)
    this.file = this.getFileBySlug(this.$route.params.subject, this.$route.params.file)
    this.url = `/files/${this.subject.slug}/${this.file.slug}/${this.file.slug}.`

    this.src = pdf.createLoadingTask(this.url + 'pdf')

    this.src.then(pdf => {
      this.numPages = pdf.numPages;
    })
  },
  computed: {
    ...mapGetters(['getSubjectBySlug', 'getFileBySlug']),
    style () {
      return `width: ${this.zoom}%`
    }
  },
  methods: {
    dateToText
  },
  metaInfo () {
    return {
      title:`${this.subject.name} : ${this.file.name} | 105`
    }
  }
}
</script>
