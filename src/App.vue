<template>
  <v-app>
    <router-view :key="$route.fullPath"/>

    <v-bottom-navigation
      :value="activePage"
      style="border-top: 1px solid rgba(0, 0, 0, .12)"
      color="primary"
      app>
      <v-btn
        v-for="page in pages"
        :key="`${page.name}__navigation-item`"
        :to="page.link">
        <span>{{ page.name }}</span>
        <v-icon>{{ page.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-footer
      style="margin-bottom: 68.4px"
      class="gradient">
      <v-row>
        <v-col
          class="text-right"
          cols="12">
          <a
            style="color: inherit"
            href="https://github.com/theovidal/105app/blob/master/LICENSE"
            rel="noreferrer"
            target="_blank">
            &copy; {{ new Date().getFullYear() }}, Théo Vidal
          </a>
        </v-col>
      </v-row>
    </v-footer>
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
