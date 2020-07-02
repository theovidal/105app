<template>
  <v-main class="contained">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6">
          <v-row>
            <v-col cols="12">
              <card gradient>
                <template #title-prepend>La clé de la réussite</template>
                <template #title>105 - L'appli</template>
                <v-img
                  width="50%"
                  src="/img/illustrations/organizer.svg"
                  alt="Studying"/>
                <div class="text--primary">
                  Accédez à des fiches de révision sur une grande variété de matières.<br>
                  Ces fiches sont éditées de manière personnelle à partir de cours.
                </div>
              </card>
            </v-col>
            <v-col cols="12">
              <card>
                <template #title>Rejoignez-moi !</template>
                <v-btn
                  href="https://github.com/theovidal"
                  target="blank"
                  color="#4A4A4A"
                  outlined>
                  <v-icon left>mdi-github</v-icon> Github
                </v-btn>
                &nbsp;
                <v-btn
                  href="https://twitter.com/exybore"
                  target="blank"
                  color="#3999E6"
                  outlined>
                  <v-icon left>mdi-twitter</v-icon> Twitter
                </v-btn>
                &nbsp;
                <v-btn
                  href="https://www.youtube.com/channel/UC9Q3XhnYp-bZUgE995Csxww"
                  target="blank"
                  color="#D40E0E"
                  outlined>
                  <v-icon left>mdi-youtube</v-icon> YouTube
                </v-btn>
              </card>
            </v-col>
            <v-col cols="12">
              <card gradient-border>
                <v-img
                  #title-prepend
                  width="50%"
                  src="/img/illustrations/surf.svg"
                  alt="Home"/>
                <template #title>Les vacances d'été sont arrivées !</template>
                <p>Reposez-vous, partez découvrir de nouveaux lieux, et revenez sur 105app juste avant la rentrée pour repartir sur le bon pied!</p>
              </card>
            </v-col>
            <v-col cols="12">
              <card>
                <template #title>Proposez vos fiches !</template>
                <p> Vous avez créé des fiches que vous considérez enrichissantes et travaillées ? Faites une proposition pour l'ajouter à 105app !</p>
                <v-btn
                  href="https://framaforms.org/soumettre-une-fiche-pour-105app-1593639677"
                  outlined>
                  <v-icon left>mdi-open-in-new</v-icon>
                  Soumettre une fiche
                </v-btn>
              </card>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="6">
          <p class="display-1 text--primary">
            <v-icon color="black">mdi-book-plus-multiple-outline</v-icon>
            Ajouts récents
          </p>
          <v-row>
            <v-col
              v-for="file in getLastFiles"
              :key="file.slug"
              cols="12">
              <file-card
                :file="file"
                :subject="getSubjectBySlug(file.subject)"
                display-subject/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import subjects from '@/data/subjects'
import { getGradient } from '@/utils/color'
import FileCard from './parts/FileCard'

export default {
  name: 'Home',
  components: { FileCard },
  data () {
    return {
      subjects
    }
  },
  computed: mapGetters(['getLastFiles', 'getSubjectBySlug']),
  methods: { getGradient }
}
</script>
