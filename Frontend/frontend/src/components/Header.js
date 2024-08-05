import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <AppBar position="static" sx={{
            width: '100%',
        }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Task Manager
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/tasks">Tasks</Button>
                <Button color="inherit" component={Link} to="/taskdetails">Task Details</Button>
            </Toolbar>
        </AppBar>
    );
}
