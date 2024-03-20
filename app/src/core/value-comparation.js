export const isValueBetween = ({ value, min, max }) => {
  return parseInt(value) >= min && parseInt(value) <= max
}

export const isEqualString = ({ value, compare }) => {
  return value.toUpperCase() === compare.toUpperCase()
}
