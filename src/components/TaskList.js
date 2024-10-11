import React, { useEffect, useState } from 'react';
import { getTasks, getTasksByCategory } from '../services/taskService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [category, setCategory] = useState(''); // 用於篩選的分類

    useEffect(() => {
        fetchTasks();
    }, [category]);

    const fetchTasks = async () => {
        try {
            if (category) {
                const response = await getTasksByCategory(category);
                setTasks(response.data);
            } else {
                const response = await getTasks();
                setTasks(response.data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <div>
            <h2>任務列表</h2>

            {/* 添加分類篩選下拉選單 */}
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">所有分類</option>
                <option value="工作">工作</option>
                <option value="個人">個人</option>
                <option value="其他">其他</option>
            </select>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.status} ({task.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
