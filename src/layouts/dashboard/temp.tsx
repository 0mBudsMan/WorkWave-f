import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box, Typography, Grid, List, ListItem, ListItemButton, } from "@mui/material";
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/300.css';
import { useRouter } from "next/router";
import { useState } from "react";




export const Layout = (props) => {
    const history = [
        {
            time: "Today",
            content: [
                {
                    desc: "Project Scope for bridge"
                },
                {
                    desc: "Budgeting for a project"
                }
            ]
        },
        {
            time: "Yesterday",
            content: [
                {
                    desc: "Sharing best practices for maintaining a safe working environment."
                },
                {
                    desc: "Dealing with unexpected challenges during the construction process."
                },
                {
                    desc: "Green Construction Practices"
                },
                {
                    desc: "Implementing effective quality control measures"
                },
                {
                    desc: "Contractual agreements and legal considerations"
                },


            ]
        },
        {
            time: "Previous 7 days",
            content: [
                {
                    desc: "Sharing best practices for maintaining a safe working environment."
                },
                {
                    desc: "Dealing with unexpected challenges during the construction process."
                },
                {
                    desc: "Green Construction Practices"
                },
                {
                    desc: "Implementing effective quality control measures"
                },
                {
                    desc: "Contractual agreements and legal considerations"
                },


            ]
        },


    ]
    const toolslist=[
        {
            imgsrc: "/photo.svg",
            title: "Add Project",
            desc: "Create a  new project for collaboration and development."
        },
        {
            imgsrc: "/photo.svg",
            title: "Create Scope From Contract",
            desc: "Form project scope using contract details in your management software."
        },
        {
            imgsrc: "/photo.svg",
            title: "Create Scope From Tender",
            desc: "Scope from tender: create in project software."
        },
        {
            imgsrc: "/photo.svg",
            title: "Open a P6 XER File",
            desc: "Use Primavera P6 or a compatible app to open XER files."
        },
        {
            imgsrc: "/photo.svg",
            title: "Connect a P6 XER File",
            desc: "Connect a P6 file in Primavera P6 or a compatible program."
        },
        
    
    ]

    const { children } = props;
    const router = useRouter();
    
    const renderedItems = history.map((item, index) => (
        <div style={{ marginBottom: "20px" }} key={index}>
          <Typography fontFamily={'Poppins, sans-serif'} fontWeight={300} fontSize={12} color={'#7C7A67'}>
            {item.time}
          </Typography>
          <List>
            {item.content.map((contentItem, contentIndex) => (
              <ListItem disablePadding key={contentIndex}>
                <ListItemButton sx={{
                  paddingLeft: "0px",
                  borderRadius: "5px", // Set your desired highlight color
                  '&:hover': {
                    backgroundColor: '#FFE299', // Set your desired hover color
                  },
                }}>
                  <Typography 
                   sx={{
                    whiteSpace: 'nowrap',     
                    overflow: 'hidden',       
                    textOverflow: 'ellipsis',   
                  }}
                   fontFamily={"Poppins,sans-serif"} fontSize={14} color="#131311" fontWeight={400} paddingY={0.15} paddingX={0.25}>{contentItem.desc}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      ));
      
      // Rest of your component code
      
               


    return (
        <>
        <Grid container sx={{}}>
            <Grid item xs={2} md={2} lg={2} paddingLeft={1} sx={{overflowY: "auto", 
			scrollbarWidth: "thin",
			scrollbarColor: "#FFE299 #FCF8F0 ",
			maxHeight: "90vh ",}}>
                <Typography fontFamily={'Poppins,sans-serif'} textAlign={"left"} fontWeight={500} padding={2} paddingLeft={0} marginBottom={5} borderTop={1} borderBottom={1} borderColor={"#987B31"}>
                    Chat History
                </Typography>
                {renderedItems}
                
            </Grid>
            <Grid item xs={10} md={10} lg={10}>
                {children}
            </Grid>

        </Grid>
       
        </>
    );
};

Layout.prototypes = {
    children: PropTypes.node,
};
