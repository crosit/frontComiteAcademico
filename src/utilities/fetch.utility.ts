import { get } from './storage.utility'

export const fetchRequest = (url: string, options: RequestInit) => {
  return get('accessToken').then((token:any) => {
    return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      ...options,
      body: JSON.stringify(options.body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || window.localStorage.getItem("sabeeoToken")}`
      }
    }).then(response => response.json())
  })
}
