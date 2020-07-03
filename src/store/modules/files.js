import { loadFiles } from '@/utils/storage'
import { fileSort } from '@/utils/sorting'

const state = loadFiles()

const getters = {
  getAllFiles: state => {
    let files = []
    for (let subject in state) {
      files = [
        ...files,
        ...state[subject]
      ]
    }
    files.sort(fileSort)
    return files
  },
  getFilesBySubject: state => subject => {
    let files = state[subject]
    if (files === undefined) return []
    else return files
  },
  getFileBySlug: state => (subject, slug) => {
    return state[subject].find(file => file.slug === slug)
  },
  getFileById: (_, getters) => id => {
    let [subject, slug] = id.split('/')
    return getters.getFileBySlug(subject, slug)
  },
  getLastFiles: (state, getters) => {
    let files = getters.getAllFiles.sort(fileSort)
    return files.slice(0, 5)
  },
  searchFiles: (state, getters) => (query, subjects) => {
    query = query.toLowerCase()
    return getters.getAllFiles.filter(file => {
      let name = file.name.toLowerCase()
      let description = file.description.toLowerCase()

      let matched = name.match(query) !== null || description.match(query) !== null
      return matched && subjects.includes(file.subject)
    })
  }
}
const mutations = {}
const actions = {}

export default { state, getters, mutations, actions }
