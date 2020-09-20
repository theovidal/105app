<template>
  <v-card :width="zoom + '%'">
    <v-card-title>{{ file.name }}</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="tableSearch"
        prepend-inner-icon="mdi-magnify"
        label="Rechercher..."
        hide-details
        single-line
        outlined/>
      <v-data-table
        :headers="data.headers"
        :items="data.items"
        :search="tableSearch"
        :group-by="data.categorised === undefined ? [] : 'category'">
        <template #group.header="{ group }">
          <td
            style="border-left: 5px solid var(--v-primary-base)"
            colspan="2">
            {{ group }}
          </td>
        </template>
        <template #item="{ item }">
          <tr>
            <template v-for="row in Object.keys(item)">
              <td
                v-if="row !== 'category'"
                :key="row"
                class="text-start"
                v-html="item[row]"/>
            </template>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import settings from '@/data/settings'

export default {
  name: 'Table',
  props: {
    file: Object,
    subject: Object,
    part: Object,

    zoom: Number
  },
  data() {
    return {
      data: [],
      tableSearch: '',
    }
  },
  mounted() {
    fetch(this.url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.data = data
      })
    this.loaded = true
  },
  computed: {
    url() {
      return `${settings.assetsRoot}/${this.subject.slug}/${this.file.slug}/${this.part.slug}.json`
    }
  }
}
</script>
