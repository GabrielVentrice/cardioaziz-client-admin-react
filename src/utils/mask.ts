const regexOnlyNumber = /\s|\/|\(|\)|\-|[a-zA-Z]/g

export const normalizeDate = value => {
  return value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3').substr(0, 10)
}
