import files from '../../data/files'

const state = {
  files
}
const getters = {
  getFilesBySubject: state => subject => {
    return state.files.filter(file => file.subject === subject)
  },
  getFileBySlug: state => slug => {
    return state.files.find(file => file.slug === slug)
  }
}
const mutations = {}
const actions = {}

export default { state, getters, mutations, actions }
