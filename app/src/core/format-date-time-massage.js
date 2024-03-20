const getDateArray = date => {
  if (date.includes(':')) {
    return new Date(date).toLocaleString('pt-Br').split(' ')
  } else {
    return new Date(date).toLocaleString('pt-Br', { timeZone: 'UTC' }).split(' ')
  }
}

export const formatTimeMessage = date => {
  const dateArray = getDateArray(date)
  return `${dateArray[1].substring(0, 5)}`
}

export const formatDateMessage = date => {
  const dateArray = getDateArray(date)
  return `${dateArray[0]}`
}

export const formatDateTimeMessage = date => {
  const dateArray = getDateArray(date);
  const formattedDate = dateArray[0].split('/').join('/');
  const formattedTime = dateArray[1].substring(0, 5);
  
  return `${formattedDate} ${formattedTime}`;
}
