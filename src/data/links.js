const links = {
  general: [
    { type: 'youtube', name: 'Mathrix', description: 'Cours en tout genre', value: 'https://www.youtube.com/c/Mathrix' },
    { type: 'youtube', name: 'Les bons profs', description: 'Cours et méthodes', value: 'https://www.youtube.com/user/lesbonsprofs' }
  ],
  maths: [
    { type: 'youtube', name: 'Hedacademy', description: 'Leçons et curiosités', value: 'https://www.youtube.com/channel/UC8SRYHgGMqAYZehYdznaqvQ' },
    { type: 'web', name: 'jaicompris.com', description: '[Spécialité] Fiches et vidéos issues de manuels', value: 'http://www.jaicompris.com/lycee/math/terminaleS-math.php' },
    { type: 'web', name: 'jaicompris.com', description: '[Expertes] Fiches et vidéos issues de manuels', value: 'http://www.jaicompris.com/lycee/math/option-maths-expertes.php' },
    { type: 'web', name: 'Site de m@ths', description: 'Cours, devoirs et calcul mental', value: 'http://sitedemaths.fr/index.php' }
  ],
  physique: [
    { type: 'youtube', name: 'DIMENSION', description: 'Vulgarisation scientifique', value: 'https://www.youtube.com/c/DIMENSI0N' },
    { type: 'youtube', name: 'ScienceClic', description: 'Vulgarisation avancée', value: 'https://www.youtube.com/c/ScienceClic' }
  ]
}

const types = {
  'youtube': { name: 'Chaîne YouTube', icon: 'mdi-youtube', color: [229, 57, 53] },
  'web': { name: 'Lien Internet', icon: 'mdi-web', color: [66, 165, 245] }
}

export default links
export { links, types }
