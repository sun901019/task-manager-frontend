import axios from 'axios';

const API_URL = 'https://bbb5-36-225-216-224.ngrok-free.app'; // 修改 API 基礎 URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get('/tasks');
    console.log('API 完整響應:', response);
    if (response.data.startsWith('<!DOCTYPE html>')) {
      throw new Error('收到 HTML 響應而不是預期的 JSON 數據');
    }
    return response;
  } catch (error) {
    console.error('API 錯誤:', error.response || error);
    if (error.response && error.response.data) {
      console.error('錯誤響應數據:', error.response.data);
    }
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post('/tasks', taskData);
    console.log('創建任務響應:', response);
    return response;
  } catch (error) {
    console.error('創建任務錯誤:', error.response || error);
    throw error;
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}/status`, { status });
    console.log('更新任務狀態響應:', response);
    return response;
  } catch (error) {
    console.error('更新任務狀態錯誤:', error.response || error);
    throw error;
  }
};

export const getTasksByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/tasks/category/${category}`);
    console.log('按類別獲取任務響應:', response);
    return response;
  } catch (error) {
    console.error('按類別獲取任務錯誤:', error.response || error);
    throw error;
  }
};
