function loadFiles () {
  const subjects = require.context(`../data/files`, true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const files = {}
  subjects.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const subject = matched[1]
      files[subject] = subjects(key)
    }
  })
  return files
}

function loadFromStorage(category) {
  let defaults = {
    library: [
      {
        name: 'Liste par défaut',
        slug: 'liste-par-defaut',
        icon: 'mdi-book-multiple-outline',
        files: []
      }
    ]
  }

  let data = localStorage.getItem(category)
  if (data === null) {
    data = JSON.stringify(defaults[category])
    localStorage.setItem(category, data)
  }

  return JSON.parse(data)
}

function saveToStorage(category, data) {
  localStorage.setItem(category, JSON.stringify(data))
}

export { loadFiles, loadFromStorage, saveToStorage }
