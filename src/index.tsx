import React from 'react'
import { render } from 'react-dom'

import { Root } from './components/Root'
import { getCoords } from './util/geolocation'
import { fetchForecast } from './util/dark-sky'

render(<Root />, document.getElementById('root'))

const test = async () => {
  const coords = await getCoords()
  const forecast = await fetchForecast(coords)
  console.log(forecast)
}

test()
