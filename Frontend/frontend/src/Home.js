import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Home.css';
import Header from './components/Header';
import StatBox from "./components/StatBox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { People, LibraryBooks } from "@mui/icons-material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const Home = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inprogressTasks, setInprogressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [message, setMessage] = useState('');
  user = JSON.parse(localStorage.getItem('user'));
  // {console.log(user)}

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3001/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userId = user.ID;
      const today = moment().format('YYYY-MM-DD');
      setTasks(response.data);
      const filteredTasks = tasks.filter(task =>
        task.userId === userId /*&& moment(task.dueDate).isSame(today, 'day')*/
      );
      console.log(filteredTasks);
      // console.log("1");

      if (filteredTasks.length === 0) {
        setMessage('You are up to date for today.');
      } else {
        setTasks(filteredTasks);
        setPendingTasks(filteredTasks.filter(task => task.status === 'Pending'));
        setInprogressTasks(filteredTasks.filter(task => task.status === 'In Progress'));
        setCompletedTasks(filteredTasks.filter(task => task.status === 'Completed'));
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  return (
      <>
      <Header />
      <div className="screen">
        <h2>Dashboard</h2>
        {/* {tasks ? (TasksTable(tasks) ) : <p>Loading</p>   }  */}

        <Grid container columns={12} spacing={2}>
          <Grid xs={6} md={8} item>
            <Box
              width="100%"
              backgroundColor={"rgb(6, 6, 75)"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              border={"1px solid black"} // Add border
              // margin="8px" // Add margin
              borderRadius={"10px"}
              // marginTop={"20px"}
              boxShadow={"10px 0 10px 0 rgba(0,0,0,0.2)"}
            >
              <StatBox
                title={completedTasks.length}
                subtitle="Completed Tasks"
                progress={completedTasks.length / tasks.length}
                // progress={bookIssuers.length / userData.length}
                increase={
                  ((completedTasks.length / tasks.length) * 100).toString().slice(0, 5) + "%"
                }
                // increase={"60%"}
                icon={<AssignmentTurnedInIcon sx={{ color: "#fff", fontSize: "26px" }} />}
              />
            </Box>
          </Grid>
          <Grid xs={6} md={4} item>
            <Box
              width="100%"
              backgroundColor={"rgb(6, 6, 75)"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              border={"2px solid black"} // Add border
              // margin="8px" // Add margin
              borderRadius={"10px"}
              // marginTop={"20px"}
              boxShadow={"10px 0 10px 0 rgba(0,0,0,0.2)"}
            >
              <StatBox
                title={tasks.length}
                subtitle="Number of Tasks"
                progress="/"
                //   increase= {((issuedBooks.length / books.length) * 100).toString() + "%" }
                increase={""}
                icon={<People sx={{ color: "#fff", fontSize: "26px" }} />}
              />
            </Box>
          </Grid>
          <Grid xs={6} md={4} item>
            <Box
              width="100%"
              backgroundColor={"rgb(6, 6, 75)"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              border={"1px solid black"} // Add border
              // margin="8px" // Add margin
              borderRadius={"10px"}
              // marginTop={"20px"}
              boxShadow={"10px 0 10px 0 rgba(0,0,0,0.2)"}
            >
              <StatBox
                title={pendingTasks.length}
                subtitle="Pending Tasks"
                progress={pendingTasks.length / tasks.length}
                increase={((pendingTasks.length / tasks.length) * 100).toString() + "%"}
                icon={<LibraryBooks sx={{ color: "#fff", fontSize: "26px" }} />}
              />
            </Box>
          </Grid>
          <Grid xs={6} md={8} item>
            <Box
              width="100%"
              backgroundColor={"rgb(6, 6, 75)"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              border={"1px solid black"} // Add border
              // margin="8px" // Add margin
              borderRadius={"10px"}
              // marginTop={"20px"}
              boxShadow={"10px 0 10px 0 rgba(0,0,0,0.2)"}
            >
              <StatBox
                title={inprogressTasks.length}
                subtitle="In Progress Tasks"
                progress={inprogressTasks.length / tasks.length}
                increase={
                  ((inprogressTasks.length / tasks.length) * 100).toString().slice(0, 5) + "%"
                }
                // increase={"60%"}
                icon={<LibraryBooks sx={{ color: "#fff", fontSize: "26px" }} />}
              />
            </Box>
          </Grid>
        </Grid>


      </div>
      </>
      );
};

      export default Home;
