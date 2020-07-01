import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = loadFromStorage('library')

const getters = {
  getLibraryFiles: (state, rootGetters) => {
    let output = []
    state.forEach(file => {
      file = file.split('/')
      output.push(rootGetters.getFileBySlug(file[0], file[1]))
    })
    return output
  }
}

const mutations = {
  ADD_FILE(state, data) {
    state.push(`${data.subject}/${data.file}`)
  },
  REMOVE_FILE(state, data) {
    let indexToRemove = state.findIndex(file => file === `${data.subject}/${data.file}`)
    state.splice(indexToRemove, 1)
  }
}

const actions = {
  addFileToLibrary({ commit, state }, data) {
    commit('ADD_FILE', data)
    saveToStorage('library', state)
  },
  removeFileFromLibrary({ commit, state }, data) {
    commit('REMOVE_FILE', data)
    saveToStorage('library', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
