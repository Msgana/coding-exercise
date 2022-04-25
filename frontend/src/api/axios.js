import axios from 'axios'

const axios = axios.create({
  baseURL: 'https://localhost:3001'
});

export default axios