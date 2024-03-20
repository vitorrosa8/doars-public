import { replaceLetters, replaceNumbers } from './format-string'
import { isEqualString, isValueBetween } from './value-comparation'

const INPUT_FORMATTER = {
  name: replaceNumbers,
  email: value => value,
  password: value => value,
  city: value => value,
  uf: replaceNumbers,
  cep: replaceLetters,
  location: value => value,
  institution: (_, checked) => checked,
  confirmedPassword: value => value,


  description: value => value,
  contact: value => value,
  history: value => value,
  donationNeeds: value => value,

  text: value => value,
}

const INPUT_VALIDATOR = {
  name: value => isValueBetween({ value: value.length, min: 2, max: 50 }),
  email: value => isValueBetween({ value: value.length, min: 2, max: 50 }),
  city: value => isValueBetween({ value: value.length, min: 2, max: 50 }),
  uf: value => isValueBetween({ value: value.length, min: 2, max: 2 }),
  cep: value => isValueBetween({ value: value.length, min: 8, max: 8 }),
  location: value => isValueBetween({ value: value.length, min: 2, max: 300 }),
  institution: () => true,

  confirmedPassword: value => value,
  password: (value, confirmedPassword) =>
    isEqualString({ value: value, compare: confirmedPassword }) &&
    isValueBetween({ value: value.length, min: 8, max: 20 }),

  description: value => isValueBetween({ value: value.length, min: 2, max: 300 }),
  contact: value => isValueBetween({ value: value.length, min: 2, max: 100 }),
  history: value => isValueBetween({ value: value.length, min: 2, max: 50000 }),
  donationNeeds: () => true,

  text: value => isValueBetween({ value: value.length, min: 2, max: 10000 }),
}

export const validateInputValues = (inputValues, optional) => {
  return Object.keys(inputValues)
    .filter(name => {
      const value = inputValues[name]
      const validatorFunction = INPUT_VALIDATOR[name]
      const isInputValid = validatorFunction(value, optional)
      return !isInputValid
    })
    .reduce((accum, name) => `${accum}${name} é inválido\n`, '')
}

export const formatInputValues = (changeEvent, inputValues) => {
  const { name, value, checked } = changeEvent.target

  const formatterFunction = INPUT_FORMATTER[name]
  const formattedValue = formatterFunction(value, checked)

  return { ...inputValues, [name]: formattedValue }
}
