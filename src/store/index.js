import Vue from 'vue'
import Vuex from 'vuex'

import files from './modules/files'
import library from './modules/library'
import subjects from './modules/subjects'

Vue.use(Vuex)

const state = {}
const getters = {}
const mutations = {}
const actions = {}

const modules = {
  files,
  library,
  subjects
}

export default new Vuex.Store({ state, getters, mutations, actions, modules })
