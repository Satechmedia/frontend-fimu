// src/lib/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL,
  withCredentials: true
});

// Helper function to get Clerk token
const getClerkToken = async () => {
  try {
    // Wait for Clerk to be ready
    if (window.Clerk?.loaded) {
      return await window.Clerk?.session?.getToken();
    }
    // If clerk is not loaded yet, wait a bit and try again
    await new Promise(resolve => setTimeout(resolve, 100));
    return await window.Clerk?.session?.getToken();
  } catch (error) {
    console.warn('Error getting auth token:', error);
    return null;
  }
};

// Request interceptor
api.interceptors.request.use(async (config) => {
  const token = await getClerkToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized request, redirecting to login');
      window.location.href = '/home';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const videoApi = {
  getVideos: (params) => 
    api.get('/videos/', { params }),
  
  getVideo: (id) => 
    api.get(`/videos/${id}`),
  
  uploadVideo: (formData) => 
    api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  
  updateVideo: (id, data) => 
    api.patch(`/videos/${id}`, data),
  
  deleteVideo: (id) => 
    api.delete(`/videos/${id}`)
};

export const adsApi = {
  getAds: (params) => 
    api.get('/ads', { params }),
  
  getAdForVideo: (videoId) => 
    api.get(`/videos/${videoId}`)
};

export default api;