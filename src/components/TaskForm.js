import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, category, priority, due_date: dueDate };
        
        try {
            await createTask(newTask);
            alert('任務創建成功！');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>任務標題：</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>描述：</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>分類：</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
                <label>優先級：</label>
                <input type="number" value={priority} onChange={(e) => setPriority(e.target.value)} />
            </div>
            <div>
                <label>到期日期：</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <button type="submit">創建任務</button>
        </form>
    );
};

export default TaskForm;
