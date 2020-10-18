<template>
  <v-main>
    <top-banner
      :title="subject.name"
      :icon="subject.icon"
      :color="subject.color"/>
    <v-container class="contained">
      <files-grid
        :files="files"
        :subject="subject">
        <template #prepend>
          <v-col
            v-if="subject.links !== undefined"
            cols="12"
            md="6"
            lg="4"
            xl="3">
            <links-list
              :links="subject.links"
              background/>
          </v-col>
        </template>
      </files-grid>
    </v-container>
  </v-main>
</template>

<script>
import TopBanner from '@/views/parts/TopBanner'
import FilesGrid from '@/views/parts/FilesGrid'
import LinksList from '@/views/parts/LinksList'

import { getSubjectBySlug } from '@/data/subjects'
import { getFilesBySubject } from '@/data/files'

import { getHexa } from '@/utils/color'

export default {
  name: 'Subject',
  components: { LinksList, FilesGrid, TopBanner },
  computed: {
    subject() {
      return getSubjectBySlug(this.$route.params.subject)
    },
    files() {
      return getFilesBySubject(this.$route.params.subject)
    }
  },
  metaInfo () {
    return {
      title:`${this.subject.name} : Toutes les fiches | 105app`,
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
          content: `https://105app.fr/subjects/${this.subject.slug}`
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
