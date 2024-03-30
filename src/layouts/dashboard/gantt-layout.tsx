import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box, Typography, Grid, List, ListItem, ListItemButton, Autocomplete, TextField} from "@mui/material";
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/300.css';
import { useRouter } from "next/router";
import { useState } from "react";
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';




export const Layout = (props) => {
  const tasks = [
    {
        name: "Backend Improvements",
        progress: 25,
        duration: "15 days"
    },
    {
        name: "Desktop Development",
        progress: 60,
        duration: "5 days"
    },
    {
        name: "Frontend Updates",
        progress: 40,
        duration: "5 days"
    },
    {
        name: "Security Enhancements",
        progress: 50,
        duration: "5 days"
    },
    {
        name: "Mobile App Development",
        progress: 30,
        duration: "10 days"
    },
    {
        name: "Database Optimization",
        progress: 70,
        duration: "10 days"
    },
    {
        name: "UI/UX Redesign",
        progress: 20,
        duration: "5 days"
    },
    {
        name: "Documentation Update",
        progress: 10,
        duration: "3 days"
    },
    {
        name: "Testing Phase",
        progress: 15,
        duration: "5 days"
    },
    {
        name: "Infrastructure Setup",
        progress: 20,
        duration: "5 days"
    },
    {
        name: "User Interface Refinement",
        progress: 25,
        duration: "5 days"
    },
    {
        name: "Backend API Development",
        progress: 30,
        duration: "5 days"
    },
    {
        name: "Bug Fixes",
        progress: 35,
        duration: "5 days"
    },
    {
        name: "Performance Optimization",
        progress: 40,
        duration: "3 days"
    },
    {
        name: "Deployment Planning",
        progress: 45,
        duration: "5 days"
    },
    {
        name: "Content Creation",
        progress: 50,
        duration: "5 days"
    },
    {
        name: "Server Configuration",
        progress: 55,
        duration: "5 days"
    },
    {
        name: "Data Analysis",
        progress: 60,
        duration: "5 days"
    },
    {
        name: "Integration Testing",
        progress: 65,
        duration: "5 days"
    },
    {
        name: "User Acceptance Testing",
        progress: 70,
        duration: "3 days"
    }
];

      
      

    const { children } = props;
    const router = useRouter();

    function CircularProgressWithLabel(
        props: CircularProgressProps & { value: number },
      ) {
        return (
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >{`${Math.round(props.value)}%`}</Typography>
            </Box>
          </Box>
        );
      }
    
    const renderedItems = tasks.map((item, index) => (
       <Grid container spacing={0.25} mb={2}>
          <Grid item xs={6} display={"flex"} alignItems={"center"} justifyContent={"flex-start "} >
            <Typography  fontFamily={'Poppins,sans-serif'}  fontWeight={400} fontSize={14}>
                {item.name}
            </Typography>
          </Grid>
          <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"} >
            <Typography sx={{textAlign: "center"}}  fontFamily={'Poppins,sans-serif'}  fontWeight={400} fontSize={14}>
            <CircularProgressWithLabel value={item.progress} />
            </Typography>
          </Grid>
          <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"} >
            <Typography sx={{textAlign: "left"}} fontFamily={'Poppins,sans-serif'}  fontWeight={400} fontSize={14}>
                {item.duration}
            </Typography>
          </Grid>
       </Grid>
      ));
      
      // Rest of your component code
      
               


    return (
        <>
        <Grid container sx={{}}>
            <Grid item xs={3} md={3} lg={3} paddingLeft={1} sx={{overflowY: "auto", 
			scrollbarWidth: "thin",
			scrollbarColor: "#FFE299 #FCF8F0 ",
      display: props.display,
			maxHeight: "90vh ",}}>
                <Box borderTop={1} borderBottom={1} borderColor={"#987B31"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                <Typography fontFamily={'Poppins,sans-serif'}  fontWeight={500} padding={2} paddingLeft={0} >
                    Task List
                </Typography>
                <Autocomplete 
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        sx={{width: "180px", margin: "6px"}}
        options={tasks.map((option) => option.name)}
        //onChange={filteringFunction}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      /> </Box>
      <Grid container spacing={0.25} mb={2}>
          <Grid item xs={6} display={"flex"} alignItems={"center"} justifyContent={"flex-start "} >
            <Typography  fontFamily={'Poppins,sans-serif'}  fontWeight={300} fontSize={12} color={"#7C7A67"}>
               Tasks
            </Typography>
          </Grid>
          <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"} >
            <Typography sx={{textAlign: "center"}}  fontFamily={'Poppins,sans-serif'}  fontWeight={300} fontSize={12} color={"#7C7A67"}>
            Progress
            </Typography>
          </Grid>
          <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center "} >
            <Typography sx={{textAlign: "left"}} fontFamily={'Poppins,sans-serif'}  fontWeight={300} fontSize={12} color={"#7C7A67"}>
                Duration
            </Typography>
          </Grid>
       </Grid>
                
                {renderedItems}
                
            </Grid>
            <Grid item xs={props.display==="none"?12:9} md={props.display==="none"?12:9} lg={props.display==="none"?12:9}>
                {children}
            </Grid>

        </Grid>
       
        </>
    );
};

Layout.prototypes = {
    children: PropTypes.node,
};
