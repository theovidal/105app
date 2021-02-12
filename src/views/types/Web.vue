<template>
  <v-list
    class="my-3"
    style="border-left: 5px solid var(--v-primary-base)">
    <v-list-item
      :href="part.slug"
      target="_blank">
      <v-list-item-avatar
        v-if="part.meta.icon !== undefined"
        tile>
        <v-img
          :src="part.meta.icon"
          :alt="file.name"/>
      </v-list-item-avatar>
      <v-list-item-content>
        <vue-markdown class="web-link__content">{{ part.meta.description }}</vue-markdown>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>mdi-open-in-new</v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Web',
  components: { VueMarkdown },
  props: {
    file: Object,
    subject: Object,
    part: Object,

    zoom: Number
  }
}
</script>

<style lang="stylus">
.web-link__content p
  margin-bottom: 0 !important
</style>
