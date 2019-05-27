let cachedPosition: Position | undefined

export const getCoords = async (): Promise<Coordinates> =>
  cachedPosition
    ? cachedPosition.coords
    : new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition((position) => {
          cachedPosition = position
          resolve(position.coords)
        }, reject),
      )
