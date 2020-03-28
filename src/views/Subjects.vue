<template>
  <main>
    <v-container>
      <h1>Matières</h1>
      <v-list>
        <v-list-item
          v-for="subject in subjects"
          :key="subject.slug"
          :to="{ name: 'subject', params: { subject: subject.slug }}">
          <v-list-item-avatar>
            <v-icon :color="subject.color">{{ subject.icon }}</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ subject.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Subject',
  data () {
    return {
      subjects: []
    }
  },
  mounted () {
    this.subjects = this.getAllSubjects
  },
  computed: {
    ...mapGetters(['getAllSubjects'])
  }
}
</script>
