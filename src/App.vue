<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>

    <v-bottom-navigation
      :value="activePage"
      color="primary"
      app>
      <v-btn
        v-for="page in pages"
        :key="page.link"
        :to="page.link">
        <span>{{ page.name }}</span>
        <v-icon>{{ page.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      activePage: '',
      pages: [
        {
          name: 'Accueil',
          icon: 'mdi-home',
          link: '/'
        },
        {
          name: 'Matières',
          icon: 'mdi-file-cabinet',
          link: '/subjects'
        },
        {
          name: 'Recherche',
          icon: 'mdi-magnify',
          link: '/search'
        },
      ]
    }
  },
  metaInfo: {
    title: '105'
  }
}
</script>
