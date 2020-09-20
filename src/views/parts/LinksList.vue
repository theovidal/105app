<template>
  <div>
    <h2 v-if="!noHeading">Liens utiles</h2>
    <v-list :class="{ background }">
      <v-list-item
        v-for="link in links"
        :key="link.value"
        :href="link.value"
        :class="{ background }"
        target="_blank">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-list-item-icon
              class="box-icon"
              :style="{ background: getGradient(types[link.type].color) }"
              v-on="on">
              <v-icon medium>{{ types[link.type].icon }}</v-icon>
            </v-list-item-icon>
          </template>
          <span>{{ types[link.type].name }}</span>
        </v-tooltip>

        <v-list-item-content>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ link.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import getGradient from '@/utils/color'
import { types } from '@/data/links'

export default {
  name: 'LinksList',
  props: {
    background: Boolean,
    links: Array,
    noHeading: Boolean
  },
  data() {
    return { types }
  },
  methods: { getGradient }
}
</script>
