import { loadFromStorage } from '../../utils/storage'

const state = {
  library: loadFromStorage('library')
}
const getters = {
  getLibrary: state => state.library
}
const mutations = {}
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
