import Axios from 'axios'

const axios = Axios.create({
  // baseURL: 'https://api.pexels.com/v1',
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: ('Client-ID ' + process.env.REACT_APP_API_UNSPLASH) as string
  }
})

export default axios
