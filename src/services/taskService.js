import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // 設置你的後端 API 地址

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
