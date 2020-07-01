<template>
  <v-main class="contained">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6">
          <v-row>
            <v-col cols="12">
              <v-card class="gradient">
                <v-card-text class="gradient">
                  <div>La clé de la réussite</div>
                  <p class="display-1 text--primary">105 - L'appli</p>
                  <v-img
                    width="50%"
                    src="/img/illustrations/organizer.svg"
                    alt="Studying"/>
                  <div class="text--primary">
                    Accédez à des fiches de révision sur une grande variété de matières.<br>
                    Éditées personnellement  par Théo Vidal 😉
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-card-text>
                  <p class="display-1 text--primary">Rejoignez-moi !</p>
                  <v-btn
                    href="https://github.com/exybore"
                    target="blank"
                    :style="`background: ${getGradient([74, 74, 74])}`">
                    <v-icon left>mdi-github</v-icon> Github
                  </v-btn>
                  &nbsp;
                  <v-btn
                    href="https://twitter.com/exybore"
                    target="blank"
                    :style="`background: ${getGradient([57, 153, 230])}`">
                    <v-icon left>mdi-twitter</v-icon> Twitter
                  </v-btn>
                  &nbsp;
                  <v-btn
                    href="https://www.youtube.com/channel/UC9Q3XhnYp-bZUgE995Csxww"
                    target="blank"
                    :style="`background: ${getGradient([212, 14, 14])}`">
                    <v-icon left>mdi-youtube</v-icon> YouTube
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-card-text>
                  <div>Pandémie de maladie à Coronavirus 2019-2020</div>
                  <v-img
                    width="50%"
                    src="/img/illustrations/home.svg"
                    alt="Home"/>
                  <p class="headline">En ce moment, ayez le bon réflexe : #RESTEZCHEZVOUS</p>
                  <p class="text--primary">C'est l'occasion idéale pour réviser ! Vous trouverez sûrement des choses intéressantes ici...</p>

                  <a href="https://www.gouvernement.fr/info-coronavirus">Obtenez les informations et conseils du Gouvernement</a>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="6">
          <p class="display-1 text--primary">
            <v-icon>mdi-database-plus</v-icon>
            Derniers ajouts
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
