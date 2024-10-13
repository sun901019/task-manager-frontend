import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, getTasksByCategory } from '../services/taskService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            let response;
            if (category) {
                response = await getTasksByCategory(category);
            } else {
                response = await getTasks();
            }
            
            const fetchedTasks = response.data;
            
            if (Array.isArray(fetchedTasks)) {
                setTasks(fetchedTasks);
            } else {
                throw new Error('返回的數據不是數組');
            }
        } catch (error) {
            console.error('獲取任務時出錯:', error);
            setError(`獲取任務失敗：${error.message}`);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    if (loading) {
        return <div>加載中...</div>;
    }

    if (error) {
        return <div>錯誤: {error}</div>;
    }

    return (
        <div>
            <h2>任務列表</h2>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">所有分類</option>
                <option value="工作">工作</option>
                <option value="個人">個人</option>
                <option value="其他">其他</option>
            </select>
            {tasks.length === 0 ? (
                <p>沒有任務</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {task.title} - {task.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
