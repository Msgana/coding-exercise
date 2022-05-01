import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:3001',
  headers: {
    "Content-type": "application/json"
  }
});

export default apiClient