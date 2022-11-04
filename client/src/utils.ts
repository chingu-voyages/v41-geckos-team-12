export const makeDate = () => {
  const dateObject = {
    minute: '',
    hour: '',
    day: '',
    month: '',
    year: '',
  }
  const date = new Date()
  const day = date.getDate()

  if (day < 10) {
    dateObject.day = `0${day}`
  } else {
    dateObject.day = `${day}`
  }

  dateObject.month = `${date.getMonth() + 1}`

  dateObject.year = `${date.getFullYear()}`

  const hour = date.getHours()

  if (hour < 10) {
    dateObject.hour = `0${hour}`
  } else {
    dateObject.hour = `${hour}`
  }

  const minute = date.getMinutes()
  if (minute < 10) {
    dateObject.minute = `0${minute}`
  } else {
    dateObject.minute = `${minute}`
  }

  return dateObject
}
