import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TasksTable from './components/TasksTable';
import AddTask from './components/AddTask';
import Header from './components/Header';

const Tasks = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState('All');
    const [filteredTasks, setFilteredTasks] = useState([]);
    user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3001/tasks', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                //filer tasks by user ID
                const userId = user.ID;
                setTasks(response.data.filter(task => task.userId === userId));
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
        if (status === 'All') {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(tasks.filter(task => task.status === status));
        }
    }, [tasks]);

    // const handleDelete = async (id) => {
    //     const token = localStorage.getItem('token');
    //     try {
    //         await axios.delete(`http://localhost:3001/tasks/${id}`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         setTasks(tasks.filter(task => task._id !== id));
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // useEffect(() => {
    //     if (status === 'All') {
    //         setFilteredTasks(tasks);
    //     } else {
    //         setFilteredTasks(tasks.filter(task => task.status === status));
    //     }
    // }, [status, tasks]);

    const handleStatus = (e) => {
        setStatus(e.target.value);
    }


    return (
        <>
            <Header />
            <div class="screen">
                <h2>Tasks</h2>
                {/* filters - use dropdown for pending, in-progress and completed */}
                < select onChange={handleStatus} value={status}>
                    <option value="All" defaultChecked >All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select >
                <br />
                <br />
                <AddTask />
                <br />
                {TasksTable(filteredTasks)}
            </div>
        </>
    );
};

export default Tasks;
