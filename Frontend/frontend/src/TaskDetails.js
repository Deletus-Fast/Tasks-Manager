import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import './TaskDetails.css';

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3001/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTask(response.data);
                setDescription(response.data.description || '');
            } catch (err) {
                console.error(err);
            }
        };
        fetchTask();
    }, [id]);

    const handleStatusToggle = async () => {
        if (task) {
            const newStatus = task.status === 'In Progress' ? 'Completed' : 'In Progress';
            if(newStatus === 'Pending') {
                newStatus = 'In Progress';
            }
            try {
                const token = localStorage.getItem('token');
                await axios.put(`http://localhost:3001/tasks/${id}`, { status: newStatus }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                task.status = newStatus;
            } catch (err) {
                console.error(err);
            }
        }
    };

    // const handleGenerateDescription = async () => {
    //     if (!description) {
    //         setLoading(true);
    //         try {
    //             const token = localStorage.getItem('token');
    //             const response = await axios.post('http://localhost:3001/tasks/generate', { title: task.title }, {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             });
    //             setDescription(response.data.description);
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    // };

    if (!task) return <div>Loading...</div>;

    return (
        <div>
            <h2>Task Details</h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong>{task.description}</p>
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
            
            <button onClick={handleStatusToggle}>
                {task.status === 'In Progress' ? 'Mark as Completed' : 'Mark as In Progress'}
            </button>
        </div>
    );
};

export default TaskDetails;
