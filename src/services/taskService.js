import axios from 'axios';

const API_URL = 'https://9d35-36-225-216-224.ngrok-free.app'; // 設置你的後端 API 地址

export const getTasks = () => {
    return axios.get(`${API_URL}/tasks`);
};

export const createTask = (taskData) => {
    return axios.post(`${API_URL}/tasks`, taskData);
};

export const updateTaskStatus = (id, status) => {
    return axios.put(`${API_URL}/tasks/${id}/status`, { status });
};

// 你還可以添加其他請求，例如搜索、分類、分頁等...
export const getTasksByCategory = (category) => {
    return axios.get(`${API_URL}/tasks/category/${category}`);
};
