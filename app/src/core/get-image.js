import defaultImage from '../assets/images/default.png'

export const getImage = image => {
  return image ? atob(image) : defaultImage
}

export const getImagePost = image => {
  return image ? atob(image) : ''
}
