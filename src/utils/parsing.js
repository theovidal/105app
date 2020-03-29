import moment from 'moment'

const today = new Date().toISOString().substr(0, 10)

function dateToText(date) {
  return moment(date, "YYYY-MM-DD").format('dddd Do MMMM YYYY')
}

export {
  today,
  dateToText
}
