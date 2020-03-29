<template>
  <main>
    <top-banner title="Matières"/>
    <v-container class="px-0">
      <v-list
        class="py-0"
        two-line>
        <template v-for="subject in subjects">
          <v-list-item
            :key="subject.slug"
            :disabled="getFilesBySubject(subject.slug).length === 0"
            :style="getFilesBySubject(subject.slug).length === 0 ? `background-color: #9E9E9E` : `background: ${getGradient(subject.color)}`"
            :to="{ name: 'subject', params: { subject: subject.slug }}">
            <v-list-item-avatar>
              <v-icon>{{ subject.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ subject.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ getFilesBySubject(subject.slug).length }} fiches</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="subject.slug"/>
        </template>
      </v-list>
    </v-container>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getGradient } from '../utils/color'
import TopBanner from './parts/TopBanner'

export default {
  name: 'Subject',
  components: { TopBanner },
  data () {
    return {
      subjects: []
    }
  },
  mounted () {
    this.subjects = this.getAllSubjects
  },
  computed: {
    ...mapGetters(['getAllSubjects', 'getFilesBySubject'])
  },
  methods: {
    getGradient
  }
}
</script>
