<template>
  <v-row style="flex-wrap: nowrap; overflow-x: scroll">
    <v-col
      v-for="file in files"
      :key="`${file.subject}/${file.slug}__card`"
      :cols="files.length > 1 ? 11 : 12"
      md="4"
      sm="6"
      lg="3">
      <file-card
        :file="file"
        :subject="getSubjectBySlug(file.subject)"
        :display-subject="displaySubject"
        :use-href="useHref"/>
    </v-col>
  </v-row>
</template>

<script>
import FileCard from './FileCard'
import { getSubjectBySlug } from '@/data/subjects'

export default {
  name: 'FilesSlider',
  components: { FileCard },
  props: {
    files: {
      type: Array,
      required: true
    },
    displaySubject: Boolean,
    useHref: Boolean
  },
  methods: { getSubjectBySlug }
}
</script>
