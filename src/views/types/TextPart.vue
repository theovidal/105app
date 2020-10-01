<template>
  <v-container>
    <vue-markdown class="md">{{ content }}</vue-markdown>
  </v-container>
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
  font-family: 'Calibri', 'Roboto'

  p
    font-size: 16.5px
    margin-bottom: 8px
  h1
    text-align: center
    font-size: 37px
  h2
    color: #808080
    font-size: 18px
    text-align: center
  h3
    color: var(--v-secondary-base) !important
    font-size: 25px
    margin-top: 12px
  h4
    color: var(--v-secondary-base) !important
    font-size: 19px

  h1, h2, h3, h4
    font-family: 'Calibri', 'Roboto'
    font-weight: normal
</style>
