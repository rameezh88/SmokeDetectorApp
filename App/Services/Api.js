// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const port = '5000'
const ip = '192.168.1.185'
const url = `http://${ip}:${port}`

const create = (baseURL = url) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const smokeCleared = () => api.get('/fire/smoke-cleared')

  return {
    // a list of the API functions from step 2
    smokeCleared
  }
}

// let's return back our create method as the default.
export default {
  create
}
