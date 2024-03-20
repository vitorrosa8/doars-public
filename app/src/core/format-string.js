export const replaceLetters = value => {
  return value.replace(/\D/g, '')
}

export const replaceNumbers = value => {
  return value.replace(/[^A-zÀ-ú ]+/g, '')
}
