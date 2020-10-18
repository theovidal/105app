<template>
  <v-app>
    <v-navigation-drawer
      :app="$vuetify.breakpoint.mdAndUp"
      :mini-variant="miniDrawer"
      class="hidden-sm-and-down"
      permanent
      :style="miniDrawer && 'width: 60px !important'">
      <v-list
        dense
        nav>
        <v-list-item
          :class="miniDrawer && 'px-0'"
          class="gradient rounded-0"
          style="margin: -8px -8px 8px; height: 48px"
          to="/">
          <v-row
            align="center"
            justify="center">
            105
          </v-row>
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
            label="Rechercher..."
            prepend-inner-icon="mdi-magnify"
            clearable
            outlined
            dense
            hide-details
            @keydown.enter="$router.push({
              name: 'search',
              query: { q: search }
            })"/>
        </v-list-item>
        <v-list-item
          v-for="page in pages"
          :key="page.name"
          :to="page.link"
          style="margin: 0 -8px 4px; padding: 0 16px;"
          class="rounded-0"
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
        <template v-for="category in subjectCategories">
          <v-divider :key="category.name + 'divider'"/>
          <v-subheader
            v-show="!miniDrawer"
            :key="category.name + 'subheader'">
            {{ category.name }}
          </v-subheader>
          <v-list-item
            v-for="subject in category.subjects"
            :key="subject.slug"
            :to="{ name: 'subject', params: { subject: subject.slug } }"
            :disabled="getFilesBySubject(subject.slug).length === 0"
            class="rounded-0"
            style="margin: 0 -8px 4px; padding: 0 16px;">
            <v-tooltip
              right
              :disabled="!miniDrawer">
              <template #activator="{ on }">
                <v-list-item-icon
                  class="box-icon"
                  :style="{ background: getFilesBySubject(subject.slug).length ? getGradient(subject.color) : '#bababa' }"
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
        </template>
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
      :style="$vuetify.breakpoint.smAndDown && 'margin-bottom: 68.4px'"
      class="gradient">
      <v-row>
        <v-col
          class="text-right"
          cols="12">
          <a
            href="https://github.com/theovidal/105app/blob/master/LICENSE"
            rel="noreferrer"
            target="_blank"
            class="black--text">
            &copy; {{ new Date().getFullYear() }}, Théo Vidal
          </a>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { getFilesBySubject } from '@/data/files'
import { subjects, subjectCategories } from '@/data/subjects'

import getGradient from '@/utils/color'

export default {
  name: 'App',
  data() {
    return {
      activePage: '',
      pages: [
        { name: 'Bibliothèque', icon: 'mdi-book-multiple-outline', link: '/library' },
      ],
      search: '',
      miniDrawer: this.$vuetify.breakpoint.mdOnly,

      subjects,
      subjectCategories
    }
  },
  computed: {
    mobilePages() {
      return [
        { name: 'Accueil', icon: 'mdi-home', link: '/' },
        ...this.pages,
        { name: 'Matières', icon: 'mdi-file-cabinet', link: '/subjects' },
        { name: 'Recherche', icon: 'mdi-magnify', link: '/search' }
      ]
    }
  },
  methods: { getGradient, getFilesBySubject },
  metaInfo() {
    return {
      title: '105app',
      meta: [
        {
          property: 'og:title',
          content: "105app"
        },
        {
          property: 'og:description',
          content: 'Les fiches de révision pratiques'
        },
        {
          property: 'og:url',
          content: 'https://105app.fr'
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
