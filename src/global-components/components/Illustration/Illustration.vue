<template>
  <v-row
    :style="style"
    justify="center"
    align="center">
    <v-col
      cols="12"
      sm="8"
      md="5"
      lg="4"
      xl="3"
      class="text-center">
      <img
        style="width: 100%"
        :src="image"
        :alt="title">
      <p class="title">{{ title }}</p>
      <p
        v-if="subtitle !== null"
        class="subtitle text-center"
        v-html="subtitle"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: String
  }
}
</script>
