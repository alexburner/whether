export const xfetch = async <T = unknown>(url: string): Promise<T> => {
  const response = await fetch(url, { mode: 'cors' })
  return response.json()
}
