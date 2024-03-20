export const uploadImage = (changeEvent, setImage) => {
  const file = changeEvent.target.files[0]
  const reader = new FileReader()

  reader.addEventListener('load', loadEvent => {
    setImage(btoa(loadEvent.target.result))
  })

  reader.readAsDataURL(file)
}
