import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM4NjYxMDk5LCJleHAiOjE3Mzg2NjgyOTl9.fZGcz9MXbUwaoYI300u8XdqNRQ68JU9X9rDdIzQNbvk`
  },
  withCredentials: true, // Ensure cookies/session data are sent
});

export default API;
