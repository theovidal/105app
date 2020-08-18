import Vue from 'vue'
import Vuetify from 'vuetify'

import fr from 'vuetify/es5/locale/fr'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const theme = {
  primary: '#79b63d',
  secondary: '#36a57e',
  lighter1: '#96D1BC',
  lighter2: '#89CAE0',
  error: colors.red.darken4,
  info: colors.blue.base,
  success: colors.green.darken1,
  warning: colors.amber.base
}

export default new Vuetify({
  theme: {
    themes: {
      light: {
        ...theme,
        text: '#000',
        background: '#f2f2f7',
        sheets: '#fff'
      },
      dark: {
        ...theme,
        text: '#fff',
        background: '#000',
        sheets: '#1c1c1d'
      }
    },
    dark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    options: {
      customProperties: true,
    }
  },
  lang: {
    locales: { fr },
    current: 'fr'
  }
})
