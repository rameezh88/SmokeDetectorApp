// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const port = '5000'
const ip = '192.168.40.16' // Point to your IP.
const url = `http://${ip}:${port}`

const create = (baseURL = url) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const smokeCleared = () => api.get('/fire/smoke-cleared')

  return {
    smokeCleared
  }
}

export default {
  create
}
