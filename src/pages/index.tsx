import { Typography, TextField, FormControl, InputLabel, Input, InputAdornment, Box, Tab } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import Image from "next/image";
// rgba(102, 112, 133, 1)
import HouseIcon from '@mui/icons-material/House';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { userGetter } from "@/utils/idgetter";
import NameSection from "@/components/NameSection";
import { gridColumnGroupsLookupSelector } from "@mui/x-data-grid";

const Dashboard = () => {
  function createData(
    name: string,
    status: string,
    id: string,
  ) {
    return { name, status, id };
  }

  const rows = [];
  
  function createOrg(
    name: string,
    role: string,
    id: string,
  ){
    return { name,role, id };
  }
  
  const alsoRows = [
    createOrg('Saaf Suthre Log', 'Leader', '69'),
    createOrg('Genetix', 'Ex-Member', '71'),
    createOrg('GeekHaven', 'CEO', '69'),
    
  ]
  
  const [tasks, setTasks] = useState([]);
  const [membership, setMembership] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    // This will log the updated membership state whenever it changes
    console.log("membership is here", membership);
    if (membership && membership.length > 0) {
      membership.forEach(m => {
        console.log("making task :", m.TodoTasks);
        if (m.TodoTasks && m.TodoTasks.length > 0) {
          m.TodoTasks.forEach(task => {
            appendTask(task);
          });
        }
      });
    }
    console.log("tasks is here", rows);
    setTasks(rows);
  }, [membership]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log("token is here", token);
    if(token){
      // fetch user info
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getuser`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })  .then(response => {
        console.log("User successfully fetched");
        console.log(response.data.data);
        setUser(response.data.data);
        console.log(response.data.data.Memberships);
        setMembership(response.data.data.Memberships);                  
      })  .catch(error => { 
        console.error('Error fetching user:', error);
      }); 
    }
  
   }, []); 

  // function for appending all the task in row array using map and createData function
  function appendTask(task){
    console.log("appending task", task.Title, task.Status, task.id);
    rows.push(createData(task.Title, task.Status, task.id));
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "85px" }}>

      <NameSection user={user}/>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "60%" }}flexBasis={1}>
          <Box mt={8} >
            <Typography mb={5} fontFamily={'Poppins, sans-serif'} color={"#00000"} fontWeight={600} fontSize={20}>My Tasks</Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Status</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <CheckCircleOutlineIcon sx={{ color: "rgba(102, 112, 133, 1)" }}></CheckCircleOutlineIcon>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      {row.status == 'COMPLETED' &&
                        <TableCell align="right" component="th" scope="row">
                          <Image src="/active.svg" width={70} height={70} alt="active"></Image>
                        </TableCell>
                      }
                      {row.status == 'PENDING' &&
                        <TableCell align="right" component="th" scope="row">
                          <Image src="/inactive.svg" width={70} height={70} alt="active"></Image>
                        </TableCell>
                      }

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box mt={8} >
            <Typography mb={5} fontFamily={'Poppins, sans-serif'} color={"#00000"} fontWeight={600} fontSize={20}>My Organisations</Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Role</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {membership.map((mem) => (
                    <TableRow
                      key={mem.OrganizationId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      
                      <TableCell component="th" scope="row">
                        {mem.Organization.Name}
                      </TableCell>

                        <TableCell align="right" component="th" scope="row">
                          {mem.UserRole}
                        </TableCell>
                      

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box   mt={8} ml={10} sx={{ border: "1px solid rgba(102, 112, 133, 1) ", borderRadius: "10px", padding: "20px", height: "400px", overflowY: "scroll", scrollbarWidth: "thin",
			scrollbarColor: "#FFE299 #FCF8F0 ", width: "90%" }}>
          <Typography mb={5} fontFamily={'Poppins, sans-serif'} color={"#00000"} fontWeight={600} fontSize={20}>About Me</Typography>
          <Typography>
            { user.About }
          </Typography>
        </Box>

      </Box>
    </div>
  )
};

Dashboard.getLayout = (page) => (
  <DashboardLayout isMinimised={false}>{page}</DashboardLayout>
);

export default Dashboard;
