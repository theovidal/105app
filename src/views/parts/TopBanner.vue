<template>
  <div
    id="top-banner"
    :class="{ 'top-banner__tall': tall, gradient: color !== [] }"
    :style="color !== [] ? `background: ${getGradient(color)}` : ''">
    <v-icon
      v-if="$vuetify.breakpoint.mdAndUp && icon !== null"
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
import { getGradient } from '../../utils/color'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    tall: {
      type: Boolean,
      default: false
    },
    color: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    getGradient
  }
}
</script>
