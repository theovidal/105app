function getRgba(color, opacity = 1) {
  return `rgba(${color.join(',')},${opacity})`
}

function getHexa(color) {
  let converted = '#'
  color.forEach(function(part) {
    let toAdd = part.toString(16)
    if (toAdd.length === 1) converted += '0'
    converted += toAdd
  })
  return converted
}

function getLighter1(color) {
  return getRgba(color, 0.95)
}

function getLighter2(color) {
  return getRgba(color, 0.55)
}

function getGradient(color) {
  let lighter1 = getLighter1(color)
  let lighter2 = getLighter2(color)

  return `linear-gradient(to right, ${lighter1}, ${lighter2}`
}

export {
  getRgba,
  getHexa,
  getLighter1,
  getLighter2,
  getGradient
}
export default getGradient
