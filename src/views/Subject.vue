<template>
  <v-content>
    <top-banner
      :title="subject.name"
      :icon="subject.icon"
      :color="subject.color"/>
    <v-container class="contained">
      <v-row>
        <v-col
          v-for="file in files"
          :key="file.slug"
          cols="12"
          md="6"
          sm="4"
          lg="3">
          <file-card
            :file="file"
            :subject="subject"/>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import FileCard from './parts/FileCard'
import TopBanner from './parts/TopBanner'
import { getHexa } from '../utils/color'

export default {
  name: 'Subject',
  components: { FileCard, TopBanner },
  data () {
    return {
      subject: {},
      files: []
    }
  },
  mounted () {
    this.subject = this.getSubjectBySlug(this.$route.params.subject)
    this.files = this.getFilesBySubject(this.$route.params.subject)
  },
  computed: {
    ...mapGetters(['getSubjectBySlug', 'getFilesBySubject'])
  },
  metaInfo () {
    return {
      title:`${this.subject.name} : Toutes les fiches | 105`,
      meta: [
        {
          property: 'og:title',
          content: `${this.subject.name} : Toutes les fiches`
        },
        {
          property: 'og:description',
          content: `Accédez aux fiches de révision en ${this.subject.name}`
        },
        {
          property: 'og:url',
          content: `https://105app.exybo.re/subjects/${this.subject.slug}`
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
