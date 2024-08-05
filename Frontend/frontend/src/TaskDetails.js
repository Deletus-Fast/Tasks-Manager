import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import CircularProgress from '@material-ui/core/CircularProgress';
import './TaskDetails.css';
import Header from './components/Header';

const TaskDetails = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);
    const [index, setIndex] = useState(0);
    // const [loading, setLoading] = useState(false);
    // const [description, setDescription] = useState('');
    user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3001/tasks', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userTasks = response.data.filter(task => task.userId === user.ID);
                setTasks(userTasks);
                setTask(userTasks[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, []);

    const handleNext = () => {
        if (tasks.length > 0) {
            const newIndex = (index + 1) % tasks.length;
            setIndex(newIndex);
            setTask(tasks[newIndex]);
        }
    };

    const handlePrevious = () => {
        if (tasks.length > 0) {
            const newIndex = (index - 1 + tasks.length) % tasks.length;
            setIndex(newIndex);
            setTask(tasks[newIndex]);
        }
    }

    if (!task) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <div className='screen'>
                <h2>Task Details</h2>
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                {/* <div className="result-container">
                    {loading ? (
                        <div className="loader-container">
                            <CircularProgress />
                        </div>
                    ) : (
                        <p>{description}</p>
                    )}
                </div>
                <button onClick={handleGenerateDescription} disabled={description}>
                    Generate
                </button> */}
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Due Date:</strong> {task.dueDate.substring(0, 10)}</p>
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </>
    );
};

export default TaskDetails;
