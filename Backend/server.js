const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const dotenv = require('dotenv');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/tasks');
const cors = require('cors');
app.use(cors());
dotenv.config();

app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Task Manager at your service!');
});

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
