<template>
  <v-card
    :to="`/subjects/${subject.slug}/${file.slug}`">
    <v-card-text>
      <p class="display-1 text--primary">{{ file.name }}</p>
      <p v-if="displaySubject">
        <v-icon
          :color="getRgba(subject.color)"
          left>
          {{ subject.icon }}
        </v-icon>
        {{ subject.name }}
      </p>
      <div
        class="text--primary"
        v-html="file.description"/>
      <v-chip>{{ dateToText(file.added) }}</v-chip>&nbsp;
      <v-chip>{{ file.level }}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
import { getRgba } from '@/utils/color'
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
    displaySubject: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    dateToText,
    getRgba
  }
}
</script>
