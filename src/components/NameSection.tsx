import { Typography, TextField, FormControl, InputLabel, Input, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import Image from "next/image";
// rgba(102, 112, 133, 1)
import HouseIcon from '@mui/icons-material/House';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const NameSection = () => {
  return (
    <>
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
        <div>
          <Typography fontFamily={'Poppins, sans-serif'} color={"#00000"} fontWeight={400} fontSize={20}>My Profile</Typography>
        </div>
        <div>
        <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment" >
          Search for Projects, Tasks and More
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
        </div>
      </div>
      <hr style={{ color: "black", width: "100%" }} />
      <div style={{marginTop: "50px", display: "flex", flexDirection: "row", alignItems: "center",}}>
        <Image src="/ash.jpeg" width="200" height="200" alt="ash" style={{borderRadius: "50%"}}></Image>
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", marginLeft: "50px"}}>
          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <Typography mr={2} fontFamily={'Poppins, sans-serif'} color={"#00000"} fontWeight={600} fontSize={30}>Aayush Prajapati</Typography>
          <Typography fontFamily={'Poppins, sans-serif'} color={"#31363F"} fontWeight={400} fontSize={15}>They/Them</Typography>
          </div>
          <div>
            <Typography fontFamily={'Poppins, sans-serif'} color={"#00000"} fontWeight={400} fontSize={20}>Cyber Secuity Expert at GeekHaven</Typography>
          </div>
          <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px"}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <HouseIcon sx={{color: 'rgba(102, 112, 133, 1)'}}></HouseIcon>
              <Typography fontFamily={'Poppins, sans-serif'} color={"rgba(102, 112, 133, 1)"} fontWeight={500} fontSize={15}>Faridabad, Haryana</Typography>
            </div>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "20px"}}>
              <AlternateEmailIcon sx={{color: 'rgba(102, 112, 133, 1)'}}></AlternateEmailIcon>
              <Typography fontFamily={'Poppins, sans-serif'} color={"rgba(102, 112, 133, 1)"} fontWeight={500} fontSize={15}>ifi2022016@iiita.ac.in</Typography>
            </div>
          </div>
        </div>
      </div> </>
  )
};

export default NameSection;
