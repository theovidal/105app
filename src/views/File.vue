<template>
  <v-main>
    <v-app-bar
      class="contained mb-3"
      elevation="0"
      style="border-bottom: 1px solid rgba(0, 0, 0, .12)"
      dense>
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
        <v-tooltip
          bottom
          open-delay="500">
          <template #activator="{ on }">
            <v-btn
              icon
              v-on="on"
              @click="rotate += 90">
              <v-icon>mdi-rotate-right</v-icon>
            </v-btn>
          </template>
          <span>Rotation de la page</span>
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
              <strong>Nom :</strong>
              {{ file.name }}
              <br>

              <strong>Description : </strong>
              <span v-html="file.description"/>
              <br>

              <strong>Auteur : </strong>
              {{ file.author }}
              <br>

              <strong>Ajoutée le :</strong>
              {{ dateToText(file.added) }}
              <br>

              <strong>Niveau (indicatif) :</strong>
              {{ file.level }}
              <br>

              <strong>Matière :</strong>
              <v-icon>{{ subject.icon }}</v-icon>
              {{ subject.name }}
              <br>
            </v-card-text>

            <v-divider/>

            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="primary"
                text
                @click="infoDialog = false">Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-spacer/>
        <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp">{{ file.name }}</v-toolbar-title>
        <v-spacer/>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <template v-if="isInLibrary">
              <v-btn
                icon
                v-on="on"
                @click="removeFileFromLibrary(libraryData)">
                <v-icon>
                  mdi-text-box-minus-outline</v-icon>
              </v-btn>
            </template>
            <template v-else>
              <v-btn
                icon
                v-on="on"
                @click="addFileToLibrary(libraryData)">
                <v-icon>mdi-text-box-plus-outline</v-icon>
              </v-btn>
            </template>
          </template>
          <span>
            <template v-if="isInLibrary">Supprimer de la bibliothèque</template>
            <template v-else>Ajouter à la bibliothèque</template>
          </span>
        </v-tooltip>
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
                <v-icon>{{ formats[format].icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ formats[format].name }} (.{{ format }})</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-row justify="center">
      <template v-if="defaultFormat === 'pdf'">
        <pdf
          v-for="i in numPages"
          :key="`${file.subject}-${file.slug}-${i}`"
          :src="src"
          :page="i"
          :rotate="rotate"
          :style="style"/>
      </template>
      <template v-else-if="defaultFormat === 'json'">
        <v-card :width="zoom + '%'">
          <v-card-title>{{ file.name }}</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="tableSearch"
              prepend-inner-icon="mdi-magnify"
              label="Rechercher dans le tableau"
              hide-details
              single-line
              outlined/>
            <v-data-table
              :headers="data.headers"
              :items="data.items"
              :search="tableSearch"/>
          </v-card-text>
        </v-card>
      </template>
    </v-row>
    <v-container>
      <v-row>
        <v-col
          cols="12">
          <p class="display-1 text--primary">
            <v-icon>mdi-file-multiple-outline</v-icon>
            {{ subject.name }} : les autres fiches
          </p>
          <files-slider :files="subjectFiles"/>
        </v-col>
      </v-row>
    </v-container>
    <v-footer class="background">
      <v-spacer/>
      <div>&copy; {{ new Date().getFullYear() }}, Théo Vidal</div>
    </v-footer>
  </v-main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import pdf from 'vue-pdf'
import FilesSlider from '@/views/parts/FilesSlider'

import formats from '@/data/formats'
import { dateToText } from '@/utils/parsing'
import { getHexa } from '@/utils/color'

export default {
  name: 'File',
  components: { pdf, FilesSlider },
  data () {
    return {
      zoom: 90,

      data: [],
      tableSearch: '',

      src: '',
      rotate: 0,
      numPages: undefined,

      zoomMenu: false,
      infoDialog: false,

      formats
    }
  },
  mounted() {
    if (this.defaultFormat === 'pdf') {
      this.src = pdf.createLoadingTask(this.url + 'pdf')

      this.src.promise.then(pdf => {
        this.numPages = pdf.numPages;
      })
    } else if (this.defaultFormat === 'json') {
      fetch(this.url + 'json')
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.data = data
        })
    }
  },
  computed: {
    ...mapState(['library']),
    ...mapGetters(['getSubjectBySlug', 'getFileBySlug', 'getFilesBySubject']),
    subject() {
      return this.getSubjectBySlug(this.$route.params.subject)
    },
    subjectFiles() {
      return this.getFilesBySubject(this.$route.params.subject)
    },
    file() {
      return this.getFileBySlug(this.$route.params.subject, this.$route.params.file)
    },
    url() {
      return `/files/${this.subject.slug}/${this.file.slug}/${this.file.slug}.`
    },
    defaultFormat() {
      return this.file.formats[0]
    },

    isInLibrary() {
      return this.library.includes(`${this.subject.slug}/${this.file.slug}`)
    },
    libraryData() {
      return {
        subject: this.subject.slug,
        file: this.file.slug
      }
    },

    style() {
      return `width: ${this.zoom}vw`
    }
  },
  methods: {
    ...mapActions(['addFileToLibrary', 'removeFileFromLibrary']),
    dateToText
  },
  metaInfo() {
    return {
      title: `${this.subject.name} : ${this.file.name} | 105`,
      meta: [
        {
          property: 'og:title',
          content: `${this.subject.name} : ${this.file.name}`
        },
        {
          property: 'og:description',
          content: this.file.description
        },
        {
          property: 'og:url',
          content: `https://105app.exybo.re/subjects/${this.subject.slug}/${this.file.slug}`
        },
        {
          name: 'theme-color',
          content: getHexa(this.subject.color)
        }
      ]
    }
  }
}
</script>
