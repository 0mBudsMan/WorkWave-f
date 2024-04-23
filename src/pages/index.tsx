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

import NameSection from "@/components/NameSection";

const Dashboard = () => {
  function createData(
    name: string,
    status: string,
    id: string,
  ) {
    return { name, status, id };
  }

  const rows = [
    createData('Create CICADA 3301', "active", "16"),
    createData("Stop being a simp", "inactive", "13"),

  ];

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
  const [organizations, setOrganizations] = useState([]);

  // function for 
  useEffect(() => {
    // Fetch tasks from backend
    // axios.get('/api/v1/tasks')
    //   .then(response => {
    //     setTasks(response.data.tasks);
    //     console.log(response.data.tasks);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching tasks:', error);
    //   });

    // Fetch organizations from backend
    axios.get('http://localhost:8000/api/v1/organisation/getOrganisations')
      .then(response => {
        console.log("Organizations successfully fetched");
        console.log(response.data);
        setOrganizations(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching organizations:', error);
      });

  // fetch user info
  // axios.get('/api/v1/user')
  //     .then(response => {
  //       setOrganizations(response.data.organizations);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching organizations:', error);
  //     });
   }, []); 


  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "85px" }}>

      <NameSection />
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
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <CheckCircleOutlineIcon sx={{ color: "rgba(102, 112, 133, 1)" }}></CheckCircleOutlineIcon>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      {row.status == "active" &&
                        <TableCell align="right" component="th" scope="row">
                          <Image src="/active.svg" width={70} height={70} alt="active"></Image>
                        </TableCell>
                      }
                      {row.status == "inactive" &&
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
                  {organizations.map((org) => (
                    <TableRow
                      key={org.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      
                      <TableCell component="th" scope="row">
                        {org.Name}
                      </TableCell>

                        <TableCell align="right" component="th" scope="row">
                          Role
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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam possimus totam consequatur aut hic quae laboriosam impedit cum, eius tempora veniam tempore tenetur, aperiam sequi enim porro mollitia repellat fugit unde voluptatem nulla nemo. Eos perferendis at labore fuga voluptates quos eius maxime dicta ex beatae explicabo molestias id sed, recusandae eaque provident. Sunt, qui commodi ipsum accusamus dolores provident asperiores eius illo? Harum nemo tenetur dolores aliquid incidunt!
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
