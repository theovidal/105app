<template>
  <v-card :width="zoom + '%'">
    <v-card-text>
      <vue-markdown class="md">{{ content }}</vue-markdown>
    </v-card-text>
  </v-card>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Text',
  components: { VueMarkdown },
  props: {
    file: Object,
    subject: Object,
    part: Object,

    zoom: Number
  },
  computed: {
    content() {
      return require(`raw-loader!../../../public/files/${this.file.subject}/${this.file.slug}/${this.part.slug}.md`).default
    }
  }
}
</script>

<style lang="stylus">
.md
  color: var(--v-text-base) !important

  p
    font-size: 15.5px
    margin-bottom: 8px
  h1
    text-align: center
    margin-bottom: 10px
</style>
