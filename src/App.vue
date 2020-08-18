<template>
  <v-app>
    <v-navigation-drawer
      :app="$vuetify.breakpoint.mdAndUp"
      :mini-variant="miniDrawer"
      class="hidden-sm-and-down"
      permanent
      :style="miniDrawer ? 'width: 60px !important' : ''">
      <v-list
        dense
        nav>
        <v-list-item
          :class="miniDrawer && 'px-0'"
          to="/">
          <v-list-item-avatar :style="miniDrawer ? 'width: 44px !important; height: 44px !important;' : ''">
            <img
              src="/favicon.ico"
              alt="Logo de 105app">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>105app</v-list-item-title>
            <v-list-item-subtitle>Les révisions pratiques</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="miniDrawer"
          to="/search">
          <v-list-item-icon class="box-icon">
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-content/>
        </v-list-item>
        <v-list-item v-else>
          <v-text-field
            v-model="search"
            :label="`Rechercher...`"
            clearable
            rounded
            filled
            dense
            solo
            hide-details
            @keydown.enter="gotoSearch"/>
        </v-list-item>
        <v-list-item
          v-for="page in pages"
          :key="page.name"
          :to="page.link"
          link>
          <v-tooltip
            right
            :disabled="!miniDrawer">
            <template #activator="{ on }">
              <v-list-item-icon
                class="box-icon gradient"
                v-on="on">
                <v-icon medium>{{ page.icon }}</v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ page.name }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ page.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list
        dense
        nav>
        <v-list-item
          v-for="subject in subjects"
          :key="subject.slug"
          :to="{ name: 'subject', params: { subject: subject.slug } }"
          :disabled="getFilesBySubject(subject.slug).length === 0">
          <v-tooltip
            right
            :disabled="!miniDrawer">
            <template #activator="{ on }">
              <v-list-item-icon
                class="box-icon"
                :style="{ background: getFilesBySubject(subject.slug).length === 0 ? '#bababa' : getGradient(subject.color) }"
                v-on="on">
                <v-icon medium>{{ subject.icon }}</v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ subject.name }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ subject.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template #append>
        <v-divider/>
        <v-row class="px-4 py-2">
          <!--<v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                icon
                v-on="on">
                <v-icon>mdi-invert-colors</v-icon>
              </v-btn>
            </template>
            <span>Inverser les couleurs</span>
          </v-tooltip>-->
          <v-spacer/>
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                icon
                v-on="on"
                @click="miniDrawer = !miniDrawer">
                <v-icon>{{ miniDrawer ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
              </v-btn>
            </template>
            <span v-if="miniDrawer">Agrandir le menu</span>
            <span v-else>Réduire le menu</span>
          </v-tooltip>
        </v-row>
      </template>
    </v-navigation-drawer>

    <router-view :key="$route.fullPath"/>

    <v-bottom-navigation
      :value="activePage"
      class="hidden-md-and-up"
      style="border-top: 1px solid rgba(0, 0, 0, .12)"
      color="primary"
      app>
      <v-btn
        v-for="page in mobilePages"
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
import subjects from '@/data/subjects'
import { getGradient } from '@/utils/color'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      activePage: '',
      pages: [
        { name: 'Bibliothèque', icon: 'mdi-book-multiple-outline', link: '/library' },
      ],
      search: '',
      miniDrawer: false,

      subjects
    }
  },
  methods: {
    getGradient,
    gotoSearch () {
      this.$router.push({
        name: 'search',
        query: { q: this.search }
      })
    }
  },
  computed: {
    ...mapGetters(['getFilesBySubject']),
    mobilePages() {
      return [
        { name: 'Accueil', icon: 'mdi-home', link: '/' },
        ...this.pages,
        { name: 'Matières', icon: 'mdi-file-cabinet', link: '/subjects' },
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
