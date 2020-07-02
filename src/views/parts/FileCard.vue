<template>
  <card
    :to="useHref ? null : url"
    :href="useHref ? url : null"
    :color="subject.color"
    center>
    <template #title>{{ file.name }}</template>
    <template #subtitle>
      <template v-if="displaySubject">
        {{ subject.name }} &mdash;
      </template>
      {{ file.level }}
    </template>
    <div
      class="text--primary"
      v-html="file.description"/>
    <span>
      <v-icon>mdi-clock-outline</v-icon>
      Ajouté le {{ dateToText(file.added) }} par {{ file.author }}
    </span>
  </card>
</template>

<script>
import { getRgba, getHexa } from '@/utils/color'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'FileCard',
  props: {
    file: {
      type: Object,
      required: true
    },
    subject: {
      type: Object,
      required: true
    },
    displaySubject: Boolean,
    useHref: Boolean
  },
  computed: {
    url() {
      return `/subjects/${this.subject.slug}/${this.file.slug}`
    }
  },
  methods: {
    dateToText,
    getRgba,
    getHexa
  }
}
</script>
