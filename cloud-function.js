/**
 * Google Cloud Function
 * Used for making Dark Sky API requests
 * Because they don't allow client-side usage:
 * https://darksky.net/dev/docs/faq#cross-origin
 *
 * Example Request:
 * https://us-central1-whether.cloudfunctions.net/dark-sky?latitude=47.666871099999994&longitude=-122.28072650000001
 */

const https = require('https')

/**
 * Dark Sky API key
 */
const key = process.env.KEY

/**
 * HTTP function that supports CORS requests.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.handleCors = (req, res) => {
  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  // and caches preflight response for 3600s
  res.set('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '3600')
    res.status(204).send('')
  } else {
    handleRequest(req, res)
  }
}

/**
 * HTTP function that assumes CORS is already handled
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const handleRequest = (req, res) => {
  if (!req.query) return res.status(400).send('Missing query')
  if (!req.query.latitude) return res.status(400).send('Missing latitude')
  if (!req.query.longitude) return res.status(400).send('Missing longitude')
  const { latitude, longitude, time } = req.query
  const params = [latitude, longitude, time].filter(Boolean).join(',')
  const url = `https://api.darksky.net/forecast/${key}/${params}`
  https
    .get(url, (got) => {
      let body = ''
      got.on('data', (data) => (body += data))
      got.on('end', () => res.status(200).send(body))
    })
    .on('error', (e) => res.status(500).send(e))
}
