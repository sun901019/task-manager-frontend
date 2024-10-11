import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice'; // 導入任務的 reducer

// 配置 Redux store
export const store = configureStore({
    reducer: {
        tasks: taskReducer, // 設定任務的 reducer
    },
});

export default store;
