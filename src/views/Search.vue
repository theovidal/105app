<template>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col
              cols="12"
              md="6">
              <v-text-field
                v-model="search"
                label="Recherche..."
                outlined>
                <template
                  v-if="search !== ''"
                  #append>
                  <v-tooltip
                    open-delay="500"
                    bottom>
                    <template #activator="{ on }">
                      <v-btn
                        :href="`?query=${search}`"
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
                v-model="chosenSubjects"
                :items="Object.keys(availableSubjects)"
                label="Matières"
                attach
                chips
                multiple
                outlined/>
            </v-col>
          </v-row>
        </v-col>
        <template v-if="search === ''">
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
              :subject="getSubjectBySlug(file.subject)"/>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import FileCard from './parts/FileCard'

export default {
  name: 'Search',
  components: { FileCard },
  data () {
    return {
      search: '',
      availableSubjects: {},
      chosenSubjects: []
    }
  },
  mounted () {
    if (this.$route.query.query !== undefined) {
      this.search = this.$route.query.query
    }
    this.getAllSubjects.forEach((subject) => {
      this.availableSubjects[subject.name] = subject.slug
    })
    this.chosenSubjects = Object.keys(this.availableSubjects)
  },
  computed: {
    ...mapGetters(['searchFiles', 'getSubjectBySlug', 'getAllSubjects']),
    files () {
      let subjects = []
      let availableSubjects = this.availableSubjects
      this.chosenSubjects.forEach(function (value) {
        subjects.push(availableSubjects[value])
      })
      return this.searchFiles(this.search, subjects)
    }
  },
  metaInfo () {
    let title = this.search === '' ? 'Recherche' : `Résultat de recherche : ${this.search}`
    return {
      title: `${title} | 105`
    }
  }
}
</script>
