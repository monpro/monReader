import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

export function setBookObject(fileName, key, value) {
  const bookKey = `${fileName}-info`
  let bookObject = getLocalStorage(bookKey)
  if (!bookObject) {
    bookObject = {}
  }
  bookObject[key] = value
  setLocalStorage(bookKey, bookObject)
}

export function getBookObject(fileName) {
  const bookKey = `${fileName}-info`
  const bookObject = getLocalStorage(bookKey)
  if (bookObject) {
    return bookObject
  }
  return null
}
