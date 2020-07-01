<template>
  <v-card
    :class="{ gradient }"
    :style="style"
    :to="to"
    class="rounded-xl">
    <v-card-text :class="{ gradient }">
      <slot name="title-prepend"/>
      <p :class="{ 'display-1': true, 'text--primary': true, 'mb-0': true, 'text-center': center }">
        <slot name="title"/>
      </p>
      <p :class="{ 'subtitle-1': true, 'text-center': center }">
        <slot name="subtitle"/>
      </p>
      <slot/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    center: Boolean,
    color: String,
    gradient: Boolean,
    to: String
  },
  computed: {
    style() {
      return {
        border: this.color === null ? '0px' : `1px solid ${this.color}`
      }
    }
  }
}
</script>
