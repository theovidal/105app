<template>
  <card gradient-border>
    <template
      v-if="post.subtitle !== undefined"
      #title-prepend>
      {{ post.subtitle }}
    </template>
    <v-img
      #title-prepend
      width="100%"
      :src="`/news/${post.slug}/${post.slug}.${post.illustration}`"
      alt="Home"/>
    <template #title>
      {{ post.title }}<br>
      <span class="subtitle-2">{{ dateToText(post.date) }}</span>
    </template>
    <vue-markdown>{{ content }}</vue-markdown>
  </card>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { dateToText } from '@/utils/parsing'

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  components: { VueMarkdown },
  computed: {
    content() {
      return require(`raw-loader!../../../public/news/${this.post.slug}/${this.post.slug}.md`).default
    }
  },
  methods: { dateToText }
}
</script>
