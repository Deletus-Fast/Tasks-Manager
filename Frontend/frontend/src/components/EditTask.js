import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ task }) {
    const [open, setOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        userId: task.userId
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const EditTask = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:3001/tasks/${task.ID}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusToggle = (e) => {
        e.preventDefault();
        let newStatus = formData.status;
        if (newStatus === 'Pending') {
            newStatus = 'In Progress';
        } else if (newStatus === 'In Progress') {
            newStatus = 'Completed';
        } else if (newStatus === 'Completed') {
            newStatus = 'Pending';
        }
        setFormData({ ...formData, status: newStatus });
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                ✏️
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Edit a Task"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <form>
                            <div>
                                <label>Title:</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div>
                                <label>Description:</label>
                                <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                            </div>
                            <div>
                                <label>Due Date:</label>
                                <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} required />
                            </div>
                            <button onClick={handleStatusToggle}>{formData.status}</button>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={EditTask}>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
