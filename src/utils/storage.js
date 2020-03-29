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

export { loadFiles }
