<template>
  <v-main>
    <v-app-bar
      class="contained mb-3"
      elevation="0"
      :style="{ 'border-bottom': '1px solid rgba(0, 0, 0, .12)', background: getHexa(subject.color) + ' !important', color: 'white' }"
      :app="pinBar"
      dense>
      <template v-if="zoomMenu">
        <v-btn
          color="white"
          icon
          @click="zoomMenu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-slider
          v-model="zoom"
          style="height: 30px"
          color="white"
          track-color="grey lighten-1"
          min="10"
          max="100"/>
      </template>
      <template v-else>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              :to="{ name: 'subject', params: { subject: file.subject } }"
              color="white"
              icon
              v-on="on">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Retour à la liste des fiches</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              color="white"
              icon
              v-on="on"
              @click="zoomMenu = true">
              <v-icon>mdi-magnify-plus-outline</v-icon>
            </v-btn>
          </template>
          <span>Niveau de zoom</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              color="white"
              icon
              v-on="on"
              @click="pinBar = !pinBar">
              <v-icon>
                <template v-if="pinBar">mdi-pin-off-outline</template>
                <template v-else>mdi-pin-outline</template>
              </v-icon>
            </v-btn>
          </template>
          <span v-if="pinBar">Masquer la barre</span>
          <span v-else>Garder la barre sur le contenu</span>
        </v-tooltip>
        <v-spacer/>
        <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp">{{ file.name }}</v-toolbar-title>
        <v-spacer/>
        <v-dialog
          v-model="infoDialog"
          width="500">
          <template v-slot:activator="{ on: dialog }">
            <v-tooltip bottom>
              <template #activator="{ on: tooltip }">
                <v-btn
                  color="white"
                  icon
                  v-on="{ ...tooltip, ...dialog }">
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span>Informations</span>
            </v-tooltip>
          </template>
          <card gradient-border>
            <template #title>
              <span class="pt-4">Informations sur la fiche</span>
            </template>
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
            <template #actions>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="white"
                  text
                  @click="infoDialog = false">Fermer</v-btn>
              </v-card-actions>
            </template>
          </card>
        </v-dialog>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              color="white"
              icon
              v-on="on"
              @click="isInLibrary ? removeFileFromLibrary(libraryData) : addFileToLibrary(libraryData)">
              <v-icon>{{ isInLibrary ? 'mdi-text-box-minus-outline' : 'mdi-text-box-plus-outline' }}</v-icon>
            </v-btn>
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
                  color="white"
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
              v-for="part in file.parts.filter(p => p.locked === undefined)"
              :key="part.slug + part.format + 'download'"
              :href="`${url}/${part.slug}.${part.format}`"
              target="_blank">
              <v-list-item-icon>
                <v-icon>{{ formats[part.format].icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ part.name }} (.{{ part.format }})</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-row
      justify="center"
      class="ma-0">
      <component
        :is="types[part.format]"
        v-for="(part, i) in file.parts.filter(p => p.hidden === undefined)"
        :key="part.slug + i + 'display'"
        :file="file"
        :subject="subject"
        :part="part"
        :zoom="zoom"/>
    </v-row>
    <v-container class="contained">
      <v-row>
        <v-col
          v-if="file.links !== undefined"
          cols="12">
          <p class="display-1 text--primary">
            <v-icon
              left
              color="text">mdi-link-variant-plus</v-icon>
            Liens pour approfondir
          </p>
          <links-list
            :links="file.links"
            no-heading
            background/>
        </v-col>
        <v-col
          v-if="suggestedFiles.length"
          cols="12">
          <p class="display-1 text--primary">
            <v-icon
              left
              color="text">mdi-file-star-outline</v-icon>
            <template v-if="file.suggestions.length > 1">Fiches associées</template>
            <template v-else>Fiche associée</template>
          </p>
          <files-slider
            :files="suggestedFiles"
            display-subject
            use-href/>
        </v-col>
        <v-col
          v-if="subjectFiles.length"
          cols="12">
          <p class="display-1 text--primary">
            <v-icon color="text">mdi-file-multiple-outline</v-icon>
            Davantage de fiches ({{ subject.name }})
          </p>
          <files-slider
            :files="subjectFiles"
            use-href/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import FilesSlider from '@/views/parts/FilesSlider'
import LinksList from '@/views/parts/LinksList'
import ImagePart from '@/views/types/ImagePart'
import PDF from '@/views/types/PDF'
import Table from '@/views/types/Table'
import TextPart from '@/views/types/TextPart'

import formats from '@/data/formats'
import settings from '@/data/settings'
import { getFileBySlug, getFileById, getFilesBySubject } from '@/data/files'
import { getSubjectBySlug } from '@/data/subjects'

import dateToText from '@/utils/parsing'
import { getHexa } from '@/utils/color'

export default {
  name: 'File',
  components: { LinksList, FilesSlider },
  data () {
    return {
      zoom: 90,

      zoomMenu: false,
      infoDialog: false,
      pinBar: true,

      types: {
        'pdf': PDF,
        'json': Table,
        'md': TextPart,
        'svg': ImagePart,
        'png': ImagePart
      },
      formats,
      settings
    }
  },
  computed: {
    ...mapState(['library']),
    subject() {
      return getSubjectBySlug(this.$route.params.subject)
    },
    subjectFiles() {
      return getFilesBySubject(this.$route.params.subject).filter(file => file.slug !== this.file.slug)
    },
    suggestedFiles() {
      if (this.file.suggestions === undefined) return []
      else {
        return this.file.suggestions.map(suggestion => {
          return getFileById(suggestion)
        })
      }
    },
    file() {
      return getFileBySlug(this.$route.params.subject, this.$route.params.file)
    },
    url() {
      return `${settings.assetsRoot}/${this.subject.slug}/${this.file.slug}`
    },

    isInLibrary() {
      return this.library.includes(`${this.subject.slug}/${this.file.slug}`)
    },
    libraryData() {
      return {
        subject: this.subject.slug,
        file: this.file.slug
      }
    }
  },
  methods: {
    ...mapActions(['addFileToLibrary', 'removeFileFromLibrary']),
    dateToText,
    getHexa
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
