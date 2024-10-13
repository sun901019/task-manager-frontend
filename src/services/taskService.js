import axios from 'axios';

const API_URL = 'https://f8fa-36-225-216-224.ngrok-free.app/api'; // 確保這是正確的 URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get('/');
    console.log('API 完整響應:', response);
    
    if (typeof response.data === 'string' && response.data.startsWith('<!DOCTYPE html>')) {
      console.error('收到的 HTML 響應:', response.data);
      throw new Error('收到 HTML 響應而不是預期的 JSON 數據');
    }
    
    return response.data;
  } catch (error) {
    console.error('API 錯誤:', error);
    if (error.response) {
      console.error('錯誤狀態:', error.response.status);
      console.error('錯誤頭部:', error.response.headers);
      console.error('錯誤數據:', error.response.data);
    } else if (error.request) {
      console.error('沒有收到響應:', error.request);
    } else {
      console.error('錯誤信息:', error.message);
    }
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post('/', taskData);
    console.log('創建任務響應:', response);
    return response;
  } catch (error) {
    console.error('創建任務錯誤:', error.response || error);
    throw error;
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(`/${id}/status`, { status });
    console.log('更新任務狀態響應:', response);
    return response;
  } catch (error) {
    console.error('更新任務狀態錯誤:', error.response || error);
    throw error;
  }
};

export const getTasksByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/category/${category}`);
    console.log('按類別獲取任務響應:', response);
    return response;
  } catch (error) {
    console.error('按類別獲取任務錯誤:', error.response || error);
    throw error;
  }
};
