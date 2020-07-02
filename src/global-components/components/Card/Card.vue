<template>
  <v-card
    :class="{ gradient: gradient || gradientBorder }"
    :style="style"
    :to="to"
    class="card">
    <v-card-text :class="{ gradient: gradient && !gradientBorder }">
      <slot name="title-prepend"/>
      <p
        :class="{ 'text-center': center }"
        class="text-h5 text--primary mb-0">
        <slot name="title"/>
      </p>
      <p
        :class="{ 'text-center': center }"
        class="subtitle-1">
        <slot name="subtitle"/>
      </p>
      <slot/>
    </v-card-text>
    <slot name="actions"/>
  </v-card>
</template>

<script>
import { getGradient } from '@/utils/color'

export default {
  name: 'Card',
  props: {
    center: Boolean,
    color: Array,
    gradient: Boolean,
    gradientBorder: Boolean,
    to: String
  },
  computed: {
    style() {
      let style = {}
      if (this.color !== undefined || this.gradientBorder) {
        style['padding'] = '3px'
        if (this.color !== undefined) style['background'] = `${getGradient(this.color)} !important`
      }

      return style
    }
  }
}
</script>
