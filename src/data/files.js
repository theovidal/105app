import fileSort from '@/utils/sorting'


const subjects = require.context(`./files`, true, /[A-Za-z0-9-_,\s]+\.json$/i)
let availableFiles = {}

subjects.keys().forEach(key => {
  const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  if (matched && matched.length > 1) {
    const subject = matched[1]
    availableFiles[subject] =
      subjects(key)
      .map(file => { return { ...file, subject  }})
      .sort(fileSort)
  }
})

const allFiles = Object.values(availableFiles).reduce((accumulator, files) => {
  if (accumulator.length < 1) accumulator = []
  accumulator = [ ...accumulator, ...files ]
  accumulator.sort(fileSort)
  return accumulator
})
const lastFiles = allFiles.slice(0, 7)

function getFilesBySubject(subject) {
  let files = availableFiles[subject]
  if (files === undefined) return []
  else return files
}

function getFileBySlug(subject, slug) {
  return availableFiles[subject].find(file => file.slug === slug)
}

function getFileById(id) {
  let [subject, slug] = id.split('/')
  return getFileBySlug(subject, slug)
}

function getFilesByQuery(query, subjects) {
  query = query.toLowerCase()
  return allFiles.filter(file => {
    let name = file.name.toLowerCase()
    let description = file.description.toLowerCase()

    let matched = name.match(query) !== null || description.match(query) !== null
    if (subjects.length) return matched && subjects.includes(file.subject)
    else return matched
  })
}

export { allFiles, lastFiles, getFilesBySubject, getFileBySlug, getFileById, getFilesByQuery }
