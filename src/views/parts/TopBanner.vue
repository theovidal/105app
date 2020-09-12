<template>
  <div
    id="top-banner"
    :class="{ 'top-banner__tall': tall, gradient: color !== [] }"
    :style="color !== [] ? `background: ${getGradient(color)} !important` : ''">
    <v-icon
      v-if="$vuetify.breakpoint.smAndUp && icon !== null"
      color="white"
      size="70px">{{ icon }}</v-icon>
    <h1 class="white--text">{{ title }}</h1>
    <h3
      v-if="subtitle !== null"
      class="grey--text font-weight-regular">
      {{ subtitle }}
    </h3>
  </div>
</template>

<script>
import getGradient from '@/utils/color'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    icon: String,
    tall: Boolean,
    color: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: { getGradient }
}
</script>
