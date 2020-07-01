<template>
  <v-app>
    <router-view :key="$route.fullPath"/>

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
  data() {
    return {
      activePage: '',
      pages: [
        { name: 'Accueil', icon: 'mdi-home', link: '/' },
        { name: 'Matières', icon: 'mdi-file-cabinet', link: '/subjects' },
        { name: 'Bibliothèque', icon: 'mdi-book-multiple-outline', link: '/library' },
        { name: 'Recherche', icon: 'mdi-magnify', link: '/search' }
      ]
    }
  },
  metaInfo() {
    return {
      title: "105 - L'appli",
      meta: [
        {
          property: 'og:title',
          content: "105 - L'appli"
        },
        {
          property: 'og:description',
          content: 'Les fiches de révision pratiques'
        },
        {
          property: 'og:url',
          content: 'https://105app.exybo.re'
        },
        {
          name: 'theme-color',
          content: '#79b63d'
        }
      ]
    }
  }
}
</script>
