import subjects from '@/data/subjects'

const state = subjects

const getters = {
  getSubjectBySlug: state => slug => {
    return state.find(subject => subject.slug === slug)
  }
}

const mutations = {}

const actions = {}

export default { state, getters, mutations, actions }
