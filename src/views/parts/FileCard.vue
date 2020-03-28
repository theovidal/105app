<template>
  <v-card
    :to="link">
    <v-card-text>
      <p class="display-1 text--primary">{{ title }}</p>
      <p v-if="subtitle !== ''">
        <v-icon
          v-if="icon !== ''"
          left>
          {{ icon }}
        </v-icon>
        {{ subtitle }}
      </p>
      <div class="text--primary">{{ description }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'FileCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>
