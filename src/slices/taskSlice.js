import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks, updateTaskStatus } from '../services/taskService';

// 異步操作：獲取任務
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await getTasks();
    return response.data;
});

// 異步操作：更新任務狀態
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, newStatus }) => {
    await updateTaskStatus(id, newStatus);
    const response = await getTasks();
    return response.data; // 返回更新後的任務列表
});

// 定義任務的 slice
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks = action.payload;
            });
    },
});

export default taskSlice.reducer;
