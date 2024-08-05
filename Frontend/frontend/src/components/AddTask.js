import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useState } from 'react';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'Pending',
        userId: user.ID
    });

    const AddTask = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3001/tasks', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                status: 'Pending',
                userId: user.ID
            });
            handleClose();
        } catch (err) {
            console.error(err);
        }
    }

    const handleGeneration = async () => {
        setFormData({ ...formData, description: 'Generating description...' });
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3001/tasks/generate', { prompt: formData.title }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            setFormData({ ...formData, description: response.data });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Task
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Create a New Task"}</DialogTitle>
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
                            {/* make button disabled if title is empty */}
                            <button type='button' onClick={handleGeneration} disabled={!formData.title}>Generate Description</button>
                            <div>
                                <label>Due Date:</label>
                                <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} required />
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={AddTask}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
