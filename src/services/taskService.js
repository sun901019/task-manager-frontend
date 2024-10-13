import axios from 'axios';

const API_URL = 'https://f8fa-36-225-216-224.ngrok-free.app/api'; // 修改 API 基礎 URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get('/tasks');
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('API Error:', error.response || error);
    throw error;
  }
};

export const createTask = (taskData) => {
  return axiosInstance.post('/tasks', taskData);
};

export const updateTaskStatus = (id, status) => {
  return axiosInstance.put(`/tasks/${id}/status`, { status });
};

export const getTasksByCategory = (category) => {
  return axiosInstance.get(`/tasks/category/${category}`);
};
