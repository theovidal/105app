import Vue from 'vue'
import Vuex from 'vuex'

import myModule from './modules/myModule'

Vue.use(Vuex)

const state = {}
const getters = {}
const mutations = {}
const actions = {}

const modules = {
  myModule
}

export default new Vuex.Store({ state, getters, mutations, actions, modules })
