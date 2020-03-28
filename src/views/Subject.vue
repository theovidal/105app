<template>
  <main>
    <v-container>
      <h1>{{ subject.name }} - Toutes les fiches</h1>
      <v-row>
        <v-col
          v-for="file in files"
          :key="file.slug"
          cols="12"
          md="6"
          sm="4"
          lg="3">
          <file-card
            :title="file.name"
            :subtitle="subject.name"
            :icon="subject.icon"
            :description="file.description"
            :link="`/subjects/${subject.slug}/${file.slug}`"/>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import FileCard from './parts/FileCard'

export default {
  name: 'Subject',
  components: { FileCard },
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
  }
}
</script>
