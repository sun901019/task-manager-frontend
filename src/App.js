import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';
import TaskPage from './pages/TaskPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tasks/new" element={<AddTaskPage />} />
                <Route path="/tasks/:id" element={<TaskPage />} />
            </Routes>
        </Router>
    );
}

export default App;
