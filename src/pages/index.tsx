import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Box,
  Tab,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import Image from "next/image";
import HouseIcon from "@mui/icons-material/House";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import NameSection from "@/components/NameSection";

const Dashboard = () => {
  function createData(name, status, id) {
    return { name, status, id };
  }

  const rows = [];
  
  const [tasks, setTasks] = useState([]);
  const [membership, setMembership] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (membership?.length > 0) {
      membership.forEach((m) => {
        if (m.TodoTasks?.length > 0) {
          m.TodoTasks.forEach((task) => {
            rows.push(createData(task.Title, task.Status, task.id));
          });
        }
      });
    }
    setTasks(rows);
  }, [membership]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.data);
          setMembership(response.data.data.Memberships);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  return (
    <Box sx={{ padding: { xs: "20px", md: "85px" } }}>
      <NameSection user={user} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box mt={8}>
            <Typography
              mb={5}
              fontFamily={"Poppins, sans-serif"}
              fontWeight={600}
              fontSize={20}
            >
              My Tasks
            </Typography>
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <CheckCircleOutlineIcon
                          sx={{ color: "rgba(102, 112, 133, 1)" }}
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">
                        {row.status === "COMPLETED" ? (
                          <Image
                            src="/active.svg"
                            width={70}
                            height={70}
                            alt="active"
                          />
                        ) : (
                          <Image
                            src="/inactive.svg"
                            width={70}
                            height={70}
                            alt="inactive"
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box mt={8}>
            <Typography
              mb={5}
              fontFamily={"Poppins, sans-serif"}
              fontWeight={600}
              fontSize={20}
            >
              My Organisations
            </Typography>
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
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{mem.Organization.Name}</TableCell>
                      <TableCell align="right">{mem.UserRole}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            mt={8}
            sx={{
              border: "1px solid rgba(102, 112, 133, 1)",
              borderRadius: "10px",
              padding: "20px",
              height: "400px",
              overflowY: "scroll",
              scrollbarWidth: "thin",
              scrollbarColor: "#FFE299 #FCF8F0",
            }}
          >
            <Typography
              mb={5}
              fontFamily={"Poppins, sans-serif"}
              fontWeight={600}
              fontSize={20}
            >
              About Me
            </Typography>
            <Typography>{user.About}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Dashboard.getLayout = (page) => (
  <DashboardLayout isMinimised={false}>{page}</DashboardLayout>
);

export default Dashboard;
