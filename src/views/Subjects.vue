<template>
  <v-main>
    <top-banner title="Matières"/>
    <div class="contained">
      <v-container class="px-0">
        <v-list
          class="py-0"
          subheader
          two-line>
          <template v-for="category in subjectCategories">
            <v-subheader
              :key="category.name + 'subheader'"
              class="background pt-2">{{ category.name }}</v-subheader>
            <v-list-item
              v-for="subject in category.subjects"
              :key="subject.slug"
              :disabled="getFilesBySubject(subject.slug).length === 0"
              :style="getFilesBySubject(subject.slug).length === 0 ? `background-color: #9E9E9E` : `background: ${getGradient(subject.color)}`"
              :to="{ name: 'subject', params: { subject: subject.slug }}">
              <v-list-item-avatar>
                <v-icon>{{ subject.icon }}</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ subject.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ getFilesBySubject(subject.slug).length === 0 ? 'Aucune' : getFilesBySubject(subject.slug).length }}
                  fiche{{ getFilesBySubject(subject.slug).length > 1 ? 's' : '' }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="category.name + 'divider'"/>
          </template>
        </v-list>
      </v-container>
    </div>
  </v-main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { getGradient } from '../utils/color'
import TopBanner from './parts/TopBanner'

export default {
  name: 'Subject',
  components: { TopBanner },
  computed: {
    ...mapState(['subjects']),
    ...mapGetters(['getFilesBySubject']),
    subjectCategories() {
      return [
        {
          name: 'Tronc commun',
          subjects: this.subjects.filter(s => s.category === 'common')
        },
        {
          name: 'Langues',
          subjects: this.subjects.filter(s => s.category === 'langs')
        },
        {
          name: 'Enseignements de spécialité',
          subjects: this.subjects.filter(s => s.category === 'specialisation')
        },
      ]
    }
  },
  methods: { getGradient }
}
</script>
