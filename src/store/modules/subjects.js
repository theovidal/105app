import subjects from '../../data/subjects'

const state = {
  subjects
}
const getters = {
  getAllSubjects: state => state.subjects,
  getSubjectBySlug: state => slug => {
    return state.subjects.find(subject => subject.slug === slug)
  }
}
const mutations = {}
const actions = {}

export default { state, getters, mutations, actions }
