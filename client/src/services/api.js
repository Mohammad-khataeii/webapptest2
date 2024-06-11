import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Authentication APIs
export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true });
  return response.data;
};

export const register = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  return response.data;
};

// User Profile APIs
export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_URL}/users/profile`, { withCredentials: true });
  return response.data;
};

// Meme and Caption APIs
export const fetchRandomMeme = async () => {
  const response = await axios.get(`${API_URL}/memes/random`);
  return response.data;
};

export const fetchRandomCaptions = async () => {
  const response = await axios.get(`${API_URL}/captions/random`);
  return response.data;
};

// Game APIs
export const submitGameResult = async (memeId, captionId) => {
  const response = await axios.post(`${API_URL}/game/submit`, { memeId, captionId }, { withCredentials: true });
  return response.data;
};

export const fetchGameHistory = async () => {
  const response = await axios.get(`${API_URL}/games/history`, { withCredentials: true });
  return response.data;
};
