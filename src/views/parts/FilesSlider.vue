<template>
  <v-row style="flex-wrap: nowrap; overflow-x: scroll">
    <v-col
      v-for="file in files"
      :key="file.slug"
      cols="11"
      md="4"
      sm="6"
      lg="3">
      <file-card
        :file="file"
        :subject="getSubjectBySlug(file.subject)"
        :display-subject="displaySubject"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import FileCard from './FileCard'

export default {
  name: 'FilesSlider',
  components: { FileCard },
  props: {
    files: {
      type: Array,
      required: true
    },
    displaySubject: {
      type: Boolean,
      default: false
    }
  },
  computed: mapGetters(['getSubjectBySlug'])
}
</script>
