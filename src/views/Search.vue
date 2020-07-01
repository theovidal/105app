<template>
  <v-content class="contained">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col
              cols="12"
              md="6">
              <v-text-field
                v-model="query"
                label="Recherche..."
                outlined>
                <template
                  v-if="query !== ''"
                  #append>
                  <v-tooltip
                    open-delay="500"
                    bottom>
                    <template #activator="{ on }">
                      <v-btn
                        :href="url"
                        icon
                        v-on="on">
                        <v-icon>mdi-link</v-icon>
                      </v-btn>
                    </template>
                    <span>Obtenir le lien vers la recherche</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <v-select
                v-if="loaded"
                v-model="chosenSubjects"
                :items="Object.keys(availableSubjects)"
                label="Matières"
                attach
                chips
                multiple
                outlined>
                <template #selection="{ item, index }">
                  <v-chip v-if="index === 0">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span
                    v-if="index === 1"
                    class="grey--text caption">
                    (+{{ chosenSubjects.length - 1 }} autres)
                  </span>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <template v-if="query === ''">
          <v-row
            style="flex-direction: column"
            class="mx-0"
            align="center">
            <v-img
              width="20vw"
              src="/img/illustrations/search.svg"
              alt="Not found"/>
            <p class="title">Recherchez des fiches</p>
            <p class="subtitle text-center">
              Commencez à taper un mot-clé et les fiches correspondantes s'afficheront.<br>
              Vous pouvez aussi définir quelles matières sont concernées par votre recherche.
            </p>
          </v-row>
        </template>
        <template v-else-if="files.length === 0">
          <v-row
            style="flex-direction: column"
            class="mx-0 px-2"
            align="center">
            <v-img
              width="20vw"
              src="/img/illustrations/not-found.svg"
              alt="Not found"/>
            <p class="title">Aucun résultat !</p>
            <p class="subtitle text-center">Essayez de relancer la recherche avec d'autres mots-clés.</p>
          </v-row>
        </template>
        <template v-else>
          <v-col
            v-for="file in files"
            :key="file.slug"
            cols="12"
            md="6"
            sm="4"
            lg="3">
            <file-card
              :file="file"
              :subject="getSubjectBySlug(file.subject)"
              display-subject/>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FileCard from './parts/FileCard'

export default {
  name: 'Search',
  components: { FileCard },
  data() {
    return {
      query: '',
      availableSubjects: {},
      chosenSubjects: [],
      loaded: false
    }
  },
  mounted() {
    if (this.$route.query.q !== undefined) {
      this.query = this.$route.query.q
    }
    if (this.$route.query.s !== undefined && this.$route.query.s !== 'all') {
      let querySubjects = this.$route.query.s.split(',')
      querySubjects.forEach((subject) => {
        this.chosenSubjects.push(this.getSubjectBySlug(subject).name)
      })
    }
    this.defaultSubjects.forEach((subject) => {
      this.availableSubjects[subject.name] = subject.slug
    })
    this.loaded = true
  },
  computed: {
    ...mapState({
      defaultSubjects: 'subjects'
    }),
    ...mapGetters(['searchFiles', 'getSubjectBySlug']),
    files() {
      return this.searchFiles(this.query, this.subjects)
    },
    subjects() {
      let subjects = []
      if (this.chosenSubjects.length === 0) {
        subjects = Object.values(this.availableSubjects)
      } else {
        this.chosenSubjects.forEach((value) => {
          subjects.push(this.availableSubjects[value])
        })
      }
      return subjects
    },
    url() {
      let query = this.query
      let subjects = this.chosenSubjects.length === 0 ? 'all' : this.subjects.join(',')
      return `?q=${query}&s=${subjects}`
    }
  },
  metaInfo() {
    let title = this.query === '' ? 'Recherche' : `Résultat de recherche : ${this.query}`
    return {
      title: `${title} | 105`
    }
  }
}
</script>
