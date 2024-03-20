export function contactMask(contact) {
  if (contact) {
    contact = contact.replace(/^(\d{2})(\d)/g, '($1) $2')
    return contact.replace(/(\d)(\d{4})$/, '$1-$2')
  }
  return ''
}
