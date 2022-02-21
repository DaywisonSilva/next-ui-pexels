import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://api.pexels.com/v1',
  headers: {
    Authorization: process.env.API_KEY as string
  }
})

export default axios
