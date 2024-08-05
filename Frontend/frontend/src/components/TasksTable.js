import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditTask from './EditTask';

export default function TasksTable(tasks) {

    const handleDelete = (id) => {
        return async () => {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`http://localhost:3001/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Task deleted");
            } catch (err) {
                console.error(err);
            }
        };
    }
    return (
        <TableContainer component={Paper}
            sx={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                paddingBottom: "50px",
                marginTop: "30px",
                
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="Tasks table">
                <TableHead>
                    <TableRow
                        sx={{
                            bgcolor: "rgb(6, 6, 75)",
                        }}
                    >
                        <TableCell
                            sx={{
                                color: "white",
                            }}
                        >ID</TableCell>
                        <TableCell
                            sx={{
                                color: "white",
                            }}
                        >Title</TableCell>
                        <TableCell
                            sx={{
                                color: "white",
                            }}
                        >Description</TableCell>
                        <TableCell
                            sx={{
                                color: "white",
                            }}
                        >Status</TableCell>
                        <TableCell
                            sx={{
                                color: "white",
                            }}
                        >Due Date</TableCell>
                        <TableCell
                            sx={{
                                color: "white",
                            }}
                        >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.length > 0 ? ( tasks.map((task) => (
                        <TableRow key={task.ID}>
                            <TableCell>{task.ID}</TableCell>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>
                                {task.status === "Completed" ? (
                                    <span
                                        sx={{
                                            color: "green",
                                        }}
                                    >
                                        {task.status}
                                    </span>
                                ) : (
                                    task.status === "In Progress" ? (
                                        <span
                                            sx={{
                                                bgcolor: "orange",
                                            }}
                                        >
                                            {task.status}
                                        </span>
                                    ) : (
                                        <span
                                            sx={{
                                                color: "red",
                                            }}
                                        >
                                            {task.status}
                                        </span>
                                    )
                                )}
                            </TableCell>
                            <TableCell>{task.dueDate.substr(0,10)}</TableCell>
                            <TableCell>
                                {/* <Link to={`/tasks/${task.ID}`}>View</Link> */}
                                <EditTask task={task} />
                                <button onClick={handleDelete(task.ID)}>Delete</button>
                            </TableCell>
                        </TableRow>
                    ))) : (
                        <TableRow>
                            <TableCell colSpan={6}>No tasks available</TableCell>
                        </TableRow>
                            )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}