import localforage from 'localforage'

export const get = (key: string): Promise<string | null> => {
  return localforage
    .getItem(key)
    .then(res => res as string)
    .catch(() => null)
}

export const getJSON = <T>(key: string): Promise<T | null> => {
  return localforage
    .getItem(key)
    .then(res => JSON.parse(res as string))
    .catch(() => null)
}

export const save = (key: string, value: string): Promise<string> => {
  return localforage.setItem(key, value)
}

export const saveJSON = <T>(key: string, value: T): Promise<string> => {
  return localforage.setItem(key, JSON.stringify({ ...value }))
}

export const erase = (key: string): Promise<void> => {
  return localforage.removeItem(key)
}
