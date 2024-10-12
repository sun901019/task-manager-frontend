import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, getTasksByCategory } from '../services/taskService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [category, setCategory] = useState('');

    const fetchTasks = useCallback(async () => {
        try {
            let response;
            if (category) {
                response = await getTasksByCategory(category);
            } else {
                response = await getTasks();
            }
            
            const fetchedTasks = response.data;
            
            // 檢查數據是否為陣列，避免 map 函數出錯
            if (Array.isArray(fetchedTasks)) {
                setTasks(fetchedTasks);
            } else {
                console.error('Fetched tasks data is not an array:', fetchedTasks);
                setTasks([]);  // 如果不是陣列，設置為空陣列以防止出錯
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [category]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div>
            <h2>任務列表</h2>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">所有分類</option>
                <option value="工作">工作</option>
                <option value="個人">個人</option>
                <option value="其他">其他</option>
            </select>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
