export const numberToTimeHour = timeSeconds => {
  return Math.floor((timeSeconds / 3600) % 24)
}

export const numberToTimeMinutes = timeSeconds => {
  return Math.floor((timeSeconds % 3600) / 60)
}

export const numberToTimeString = timeSeconds => {
  const hours = Math.floor((timeSeconds / 3600) % 24)
  const minutes = Math.floor((timeSeconds % 3600) / 60)

  return [hours, minutes].map(unit => unit.toString().padStart(2, '0')).join(':')
}
