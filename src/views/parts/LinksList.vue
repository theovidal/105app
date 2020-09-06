<template>
  <v-list :class="{ background }">
    <v-list-item
      v-for="link in links[category]"
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
</template>

<script>
import { getGradient } from '@/utils/color'
import { links, types } from '@/data/links'

export default {
  name: 'LinksList',
  props: {
    category: {
      type: String,
      default: 'general'
    },
    background: Boolean
  },
  data() {
    return {
      links, types
    }
  },
  methods: { getGradient }
}
</script>
