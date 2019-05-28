import React from 'react'
import { render } from 'react-dom'

import { Root } from './components/Root'
import { getCoords } from './util/geolocation'
import { fetchForecast } from './util/dark-sky'

render(<Root />, document.getElementById('root'))

console.log('hello')

const test = async () => {
  console.log('getting coords')

  const coords = await getCoords()

  console.log('about to fetch')

  const forecast = await fetchForecast(coords)
  console.log(forecast)
}

test()
