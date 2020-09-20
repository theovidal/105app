const links = [
  { type: 'web', name: 'LeLivreScolaire.fr', description: 'Manuels scolaires en ligne', value: 'https://www.lelivrescolaire.fr/' },
  { type: 'youtube', name: 'Mathrix', description: 'Cours en tout genre', value: 'https://www.youtube.com/c/Mathrix' },
  { type: 'youtube', name: 'Les bons profs', description: 'Cours et méthodes', value: 'https://www.youtube.com/user/lesbonsprofs' },
  { type: 'youtube', name: "L'antisèche", description: 'Cours et préparations aux épreuves', value: 'https://www.youtube.com/channel/UCeOp9CWBaW2tVIBAzCobzow' }
]

const types = {
  'youtube': { name: 'Chaîne YouTube', icon: 'mdi-youtube', color: [229, 57, 53] },
  'web': { name: 'Lien Internet', icon: 'mdi-web', color: [66, 165, 245] },
  'video': { name: 'Vidéo', icon: 'mdi-video-outline', color: [238, 152, 13] }
}

export default links
export { links, types }
