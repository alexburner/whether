import { xfetch } from './xfetch'

const HOST = 'https://api.darksky.net'
const KEY = 'dangit'

const getUrl = (resource: string, coords: Coordinates): string =>
  `${HOST}/${resource}/${KEY}/${coords.latitude},${coords.longitude}`

export const fetchForecast = async (coords: Coordinates): Promise<unknown> =>
  xfetch(getUrl('forecast', coords))
