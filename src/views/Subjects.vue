<template>
  <v-main>
    <top-banner title="Matières"/>
    <v-container class="contained fluid">
      <v-list
        class="py-0"
        subheader
        two-line>
        <template v-for="category in subjectCategories">
          <v-subheader
            :key="`${category.name}__subheader`"
            class="background pt-2">{{ category.name }}</v-subheader>
          <v-list-item
            v-for="subject in category.subjects"
            :key="subject.slug"
            :disabled="getFilesBySubject(subject.slug).length === 0"
            :style="{ background: getFilesBySubject(subject.slug).length === 0 ? 'var(--v-disabled-base)' : getGradient(subject.color) }"
            :to="{ name: 'subject', params: { subject: subject.slug }}">
            <v-list-item-avatar>
              <v-icon>{{ subject.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ subject.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ getFilesBySubject(subject.slug).length === 0 ? 'Aucune' : getFilesBySubject(subject.slug).length }}
                fiche<template v-if="getFilesBySubject(subject.slug).length > 1">s</template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`${category.name}__divider`"/>
        </template>
      </v-list>
    </v-container>
  </v-main>
</template>

<script>
import TopBanner from '@/views/parts/TopBanner'

import { getFilesBySubject } from '@/data/files'
import { subjects, subjectCategories } from '@/data/subjects'
import getGradient from '@/utils/color'

export default {
  name: 'Subject',
  components: { TopBanner },
  data() { return { subjects, subjectCategories } },
  methods: { getGradient, getFilesBySubject }
}
</script>
