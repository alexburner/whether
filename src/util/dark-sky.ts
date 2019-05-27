import { xfetch } from './xfetch'

const BASE_URL = 'https://us-central1-whether.cloudfunctions.net/dark-sky'

const getUrl = (coords: Coordinates, time?: number): string => {
  let url = BASE_URL
  url += `?latitude=${coords.latitude}`
  url += `&longitude=${coords.longitude}`
  if (time !== undefined) url += `&time=${time}`
  return url
}

export const fetchForecast = async (coords: Coordinates): Promise<unknown> =>
  xfetch(getUrl(coords))
