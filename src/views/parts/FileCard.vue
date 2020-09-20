<template>
  <card
    :to="useHref || readonly ? null : url"
    :href="useHref && !readonly ? url : null"
    :color="subjectData.color"
    :aria-readonly="readonly"
    center>
    <template #title>{{ file.name }}</template>
    <template #subtitle>
      <template v-if="displaySubject">
        {{ subjectData.name }} &mdash;
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
    <slot/>
  </card>
</template>

<script>
import { getHexa } from '@/utils/color'
import dateToText from '@/utils/parsing'

import { getSubjectBySlug } from '@/data/subjects'

export default {
  name: 'FileCard',
  props: {
    file: {
      type: Object,
      required: true
    },
    subject: Object,
    readonly: Boolean,
    displaySubject: Boolean,
    useHref: Boolean
  },
  computed: {
    url() {
      return `/subjects/${this.file.subject}/${this.file.slug}`
    },
    subjectData() {
      return this.subject === undefined ? this.getSubjectBySlug(this.file.subject) : this.subject
    }
  },
  methods: {
    dateToText,
    getHexa,
    getSubjectBySlug
  }
}
</script>
