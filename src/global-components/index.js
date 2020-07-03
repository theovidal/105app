import Vue from 'vue'
import * as components from './components'

const GlobalComponents = {
  install (Vue, ) {
    for (const key in components) {
      const component = components[key]
      Vue.component(key, component)
    }
  }
}

Vue.use(GlobalComponents)
