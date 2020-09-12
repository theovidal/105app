<template>
  <v-main>
    <v-container class="contained">
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
                v-model="selection"
                :items="defaultSubjects"
                item-value="slug"
                label="Matières"
                deletable-chips
                clearable
                multiple
                outlined
                attach
                chips>
                <template #item="{ item: subject }">
                  <v-icon
                    class="box-icon"
                    :style="{ background: getGradient(subject.color), color: 'white !important' }"
                    left>{{ subject.icon }}</v-icon>
                  {{ subject.name }}
                </template>
                <template #selection="{ item: subject }">
                  <v-chip
                    :color="getHexa(subject.color)"
                    small>
                    <span>{{ subject.name }}</span>
                  </v-chip>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <illustration
          v-if="query === ''"
          image="/img/illustrations/search.svg"
          title="Recherchez des fiches"
          subtitle="Commencez à taper un mot-clé et les fiches correspondantes s'afficheront.<br>Vous pouvez aussi définir quelles matières sont concernées par votre recherche."/>
        <illustration
          v-else-if="!files.length"
          image="/img/illustrations/not-found.svg"
          title="Aucun résultat !"
          subtitle="Essayez de relancer la recherche avec d'autres mots-clés."/>
        <template v-else>
          <v-col
            v-for="file in files"
            :key="`${file.subject}/${file.slug}__search-result`"
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
  </v-main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FileCard from '@/views/parts/FileCard'
import { getGradient, getHexa } from '@/utils/color'

export default {
  name: 'Search',
  components: { FileCard },
  data() {
    return {
      query: '',
      selection: [],

      loaded: false
    }
  },
  mounted() {
    if (this.$route.query.q !== undefined) this.query = this.$route.query.q

    let querySubjects = this.$route.query.s
    if (querySubjects !== undefined && querySubjects !== 'all')
      querySubjects.split(',').forEach((subject) => this.selection.push(subject))

    this.loaded = true
  },
  computed: {
    ...mapState({
      defaultSubjects: 'subjects'
    }),
    ...mapGetters(['getFilesByQuery', 'getSubjectBySlug']),
    files() {
      return this.getFilesByQuery(this.query, this.selection)
    },
    url() {
      let query = this.query
      let subjects = this.selection.length ? this.selection.join(',') : 'all'
      return `?q=${query}&s=${subjects}`
    }
  },
  methods: { getGradient, getHexa },
  metaInfo() {
    let title = this.query.length ? `Résultat de recherche : ${this.query}` : 'Recherche'
    return {
      title: `${title} | 105`
    }
  }
}
</script>
