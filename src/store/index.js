import Vue from 'vue'
import Vuex from 'vuex'

import library from './modules/library'

Vue.use(Vuex)

const state = {}
const getters = {}
const mutations = {}
const actions = {}

const modules = { library }

export default new Vuex.Store({ state, getters, mutations, actions, modules })
