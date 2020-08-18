<template>
  <v-main>
    <v-container class="contained">
      <v-row>
        <v-col
          cols="12"
          md="6">
          <v-row>
            <v-col cols="12">
              <card gradient>
                <template #title>
                  <span class="black--text">105app &mdash; Bienvenue</span>
                </template>
                <v-img
                  width="50%"
                  src="/img/illustrations/organizer.svg"
                  alt="Studying"/>
                <div class="black--text">
                  Accédez à des fiches de révision sur une grande variété de matières.<br>
                  Ces fiches sont éditées de manière personnelle à partir de cours.
                </div>
              </card>
            </v-col>
            <v-col cols="12">
              <card>
                <template #title>Pour démarrer...</template>
                <v-expansion-panels
                  accordion
                  flat>
                  <v-expansion-panel
                    v-for="tip in tips"
                    :key="`tip--'${tip.title}'`"
                    style="box-shadow: none">
                    <v-expansion-panel-header>{{ tip.title }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <p>{{ tip.content }}</p>
                      <v-row class="mx-0">
                        <v-spacer/>
                        <v-btn
                          v-if="tip.link !== undefined"
                          :class="{ 'hidden-md-and-up': tip.mobileOnly !== undefined }"
                          :to="tip.link"
                          text>
                          Aperçu
                          <v-icon right>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </card>
            </v-col>
            <v-col cols="12">
              <card>
                <template #title>Proposez vos fiches</template>
                <p> Vous avez créé des fiches que vous considérez enrichissantes et travaillées ? Faites une proposition pour l'ajouter à 105app !</p>
                <v-btn
                  rel="noreferrer"
                  href="https://framaforms.org/soumettre-une-fiche-pour-105app-1593639677"
                  target="_blank"
                  outlined>
                  <v-icon left>mdi-open-in-new</v-icon>
                  Soumettre une fiche
                </v-btn>
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
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="6">
          <p class="display-1 text--primary">
            <v-icon color="text">mdi-book-plus-multiple-outline</v-icon>
            Ajouts récents
          </p>
          <v-row>
            <v-col
              v-for="file in getLastFiles"
              :key="file.slug"
              cols="12"
              sm="6"
              md="12">
              <file-card
                :file="file"
                :subject="getSubjectBySlug(file.subject)"
                display-subject/>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <p class="display-1 text--primary">
            <v-icon color="text">mdi-post-outline</v-icon>
            Actualités de 105app
            <v-row>
              <v-col
                v-for="post in news"
                :key="`${post.slug}__news-card`"
                cols="12"
                sm="6"
                lg="4"
                xl="3">
                <news-card :post="post"/>
              </v-col>
            </v-row>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

import FileCard from '@/views/parts/FileCard'
import NewsCard from '@/views/parts/NewsCard'

import subjects from '@/data/subjects'
import news from '@/data/news'
import { getGradient } from '@/utils/color'


export default {
  name: 'Home',
  components: { NewsCard, FileCard },
  data () {
    return {
      tips: [
        {
          title: 'Prenez connaissance des dernières publications',
          content: "Des fiches sont régulièrement ajoutées sur 105app, et les plus récentes sont affichées sur cette page d'accueil." +
            "Regardez à droite sur PC ou descendez plus bas sur mobile."
        },
        {
          title: 'Consultez toutes les fiches',
          content: "L'intégralité des fiches disponibles sur 105app sont répertoriées dans la page des matières, et sont organisées pour une navigation agréable.",
          link: '/subjects',
          mobileOnly: true,
        },
        {
          title: 'Recherchez des fiches spécifiques',
          content: "Vous savez déjà quelle fiche vous souhaitez consulter ? Effectuez une recherche avec les mots clé correspondant et vous la retrouverez !",
          link: '/search'
        },
        {
          title: 'Ajoutez des fiches à votre bibliothèque',
          content: "La bibliothèque est personnelle, et vous permet d'y lister les fiches de votre choix. Pour en ajouter une, cliquez sur l'icône de sauvegarde en haut à droite de ladite fiche.",
          link: '/library'
        }
      ],

      subjects,
      news
    }
  },
  computed: mapGetters(['getLastFiles', 'getSubjectBySlug']),
  methods: { getGradient }
}
</script>
