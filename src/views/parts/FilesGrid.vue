<template>
  <v-row>
    <slot name="prepend"/>
    <v-col
      v-for="file in files"
      :key="file.slug"
      cols="12"
      md="6"
      sm="4"
      lg="3">
      <file-card
        :file="file"
        :subject="subject"
        :readonly="readonly"
        :display-subject="displaySubject">
        <slot
          name="card"
          v-bind:file="file"/>
      </file-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import FileCard from './FileCard'

export default {
  components: { FileCard },
  props: {
    files: {
      type: Array,
      required: true
    },
    subject: Object,
    readonly: Boolean,
    displaySubject: Boolean
  },
  computed: mapGetters(['getSubjectBySlug'])
}
</script>
