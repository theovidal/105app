import subjects from '@/data/subjects'

const state = subjects

const getters = {
  getSubjectBySlug: state => slug => {
    return state.find(subject => subject.slug === slug)
  },
  subjectCategories: state => [
    {
      name: 'Tronc commun',
      subjects: state.filter(s => s.category === 'common')
    },
    {
      name: 'Langues',
      subjects: state.filter(s => s.category === 'langs')
    },
    {
      name: 'Enseignements de spécialité',
      subjects: state.filter(s => s.category === 'specialisation')
    },
  ]
}

const mutations = {}

const actions = {}

export default { state, getters, mutations, actions }
