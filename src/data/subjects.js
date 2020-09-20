const subjects = [
  { name: 'Philosophie', slug: 'philosophie', category: 'common', icon: 'mdi-head-snowflake-outline', color: [231, 76, 60] },
  { name: 'Histoire', slug: 'histoire', category: 'common', icon: 'mdi-timer-sand', color: [211, 84, 0] },
  { name: 'Géographie', slug: 'geographie', category: 'common', icon: 'mdi-earth', color: [106, 176, 76] },
  { name: 'Enseignement scientifique', category: 'common', slug: 'enseignement-scientifique', icon: 'mdi-sprout-outline', color: [46, 204, 113] },

  { name: 'Anglais', slug: 'anglais', category: 'langs', icon: 'mdi-tea-outline', color: [255, 121, 121] },
  { name: 'Espagnol', slug: 'espagnol', category: 'langs', icon: 'mdi-translate', color: [230, 126, 34] },

  { name: 'Mathématiques', slug: 'maths', category: 'specialisation', icon: 'mdi-calculator', color: [241, 196, 15], links: [
    { type: 'youtube', name: 'Hedacademy', description: 'Leçons et curiosités', value: 'https://www.youtube.com/channel/UC8SRYHgGMqAYZehYdznaqvQ' },
    { type: 'web', name: 'jaicompris.com', description: '[Spécialité] Fiches et vidéos du manuel Nathan', value: 'http://www.jaicompris.com/lycee/math/terminaleS-math.php' },
    { type: 'web', name: 'jaicompris.com', description: '[Expertes] Fiches et vidéos du manuel Nathan', value: 'http://www.jaicompris.com/lycee/math/option-maths-expertes.php' },
    { type: 'web', name: 'Site de m@ths', description: 'Cours, devoirs et calcul mental', value: 'http://sitedemaths.fr/index.php' }
    ]
  },
  { name: 'Physique', slug: 'physique', category: 'specialisation', icon: 'mdi-telescope', color: [41, 128, 185], links: [
    { type: 'youtube', name: 'DIMENSION', description: 'Vulgarisation scientifique', value: 'https://www.youtube.com/c/DIMENSI0N' },
    { type: 'youtube', name: 'ScienceClic', description: 'Vulgarisation avancée', value: 'https://www.youtube.com/c/ScienceClic' } ]
  },
  { name: 'Chimie', slug: 'chimie', category: 'specialisation', icon: 'mdi-beaker-outline', color: [155, 89, 152] },
  { name: "Sciences de l'ingénieur", slug: 'si', category: 'specialisation', icon: 'mdi-engine',  color: [22, 160, 133] },
]

const subjectCategories = [
  { name: 'Tronc commun', subjects: subjects.filter(s => s.category === 'common') },
  { name: 'Langues vivantes', subjects: subjects.filter(s => s.category === 'langs') },
  { name: 'Enseignements de spécialité', subjects: subjects.filter(s => s.category === 'specialisation') }
]

function getSubjectBySlug(slug) {
  return subjects.find(subject => subject.slug === slug)
}

export default subjects
export { subjects, subjectCategories, getSubjectBySlug }
