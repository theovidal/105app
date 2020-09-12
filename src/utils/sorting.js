const fileSort = (a, b) => {
  const dateA = new Date(a.added).getTime()
  const dateB = new Date(b.added).getTime()
  return (dateA > dateB) ? -1 : ((dateB > dateA) ? 1 : 0)
}

export { fileSort }
export default fileSort
