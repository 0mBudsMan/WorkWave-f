import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import Image from "next/image";
import '@fontsource-variable/manrope';
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
	Box,
	Button,
	Collapse,
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	SvgIcon,
	Typography,
	makeStyles,
	useMediaQuery,
} from "@mui/material";
import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import React, { useEffect, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { styled } from '@mui/system';

const inforouting=[
	{
		path: "",
		class: "Dashboard",
		subClass: ""
	},
	
	{
		path: "projects",
		class: "Project",
		subClass: "My_Projects"
	},
	
	{
		path: "gantt-chart",
		class: "ScopeManagement",
		subClass: "GanttChart"
	},
	{
		path: "kanban",
		class: "ScopeManagement",
		subClass: "Kanban"
	}
	
	//rest of the routes will be added once those pages are made
]


export const SideNav = (props) => {
	const { open, onClose, isMinimised } = props;
	
		const pathname = usePathname();
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
	const [openProject, setOpenProject] = useState(true);
	const [openScope, setOpenScope] = useState(true);
	const [openTimeManagement, setOpenTimeManagement] = useState(true);
	const [openReports, setOpenReports] = useState(true);
	const [openDocumentManagement, setOpenDocumentManagement] = useState(true);
	const [openCostEstimate, setOpenCostEstimate] = useState(true);
	const [openBudgetManagement, setOpenBudgetManagement] = useState(true);
	const [openResourceManagement, setOpenResourceManagement] = useState(true);
	const [openSettings, setOpenSettings] = useState(true);
	const StyledTypography = styled(Typography)({
		fontFamily: 'Poppins, sans-serif',
		
	  });

	const [localisMinimised,setIsMinimised]=useState(isMinimised);

	const handleMouseEnter = () => {
		if(isMinimised===true)setIsMinimised(false);
	  };
	
	  const handleMouseLeave = () => {
		if(isMinimised===true)setIsMinimised(true);
	  };
	
	  
	  useEffect(()=>{
		if(localisMinimised){
			var elements = document.getElementsByClassName("css-1np3eo0");
	
	if (elements.length > 0) {
		//alert("shrt")
	  elements[0].style.paddingLeft = "125px";
	} else {
	  console.error("Element not found");
	}
		}
	else{
		var elements = document.getElementsByClassName("css-1np3eo0");
	
	if (elements.length > 0) {
		//alert("shrt")
	  elements[0].style.paddingLeft = "250px";
	} else {
	  console.error("Element not found");
	}
	}
		const currentURL = window.location.href;
	  const urlObject = new URL(currentURL);
	  const extractedWord = urlObject.pathname.split("/")[1];
	 //alert(extractedWord)
	 let x=document.getElementsByClassName(extractedWord)[0]; 
	let temp; let temp1; let temp2; let newSrc;
	 for(let i=0;i<inforouting.length;i++){
		
		if(inforouting[i].path==extractedWord){
			console.log(inforouting[i].path+" "+extractedWord)
			console.log(inforouting[i].class)
			newSrc=inforouting[i].class;
			console.log(document.getElementsByClassName(inforouting[i].class))
			 temp=document.getElementsByClassName(inforouting[i].class)[0];
			
			 temp1=document.getElementsByClassName(inforouting[i].subClass)[0];
			 temp2=document.getElementsByClassName(inforouting[i].subClass)[1];
			
		}
		else{
			let temmp=document.getElementsByClassName(inforouting[i].class)[0];
			if(temmp) {
				if(temmp) {temmp.style.color="#F5C200";
				console.log(temmp.parentElement?.parentElement?.previousSibling?.firstChild)
				//newSrc="/"+newSrc+".svg"
			   //console.log( temp.parentElement.parentElement.previousSibling.firstChild.src)
			   console.log(inforouting[i].class)
			   temmp.parentElement.parentElement.previousSibling.firstChild.src="/"+inforouting[i].class+".svg";
			   }
				temmp.style.color="white"
			}
			let temmp1=document.getElementsByClassName(inforouting[i].subClass)[0];
			if(temmp1) {
				temmp1.style.backgroundColor="#181F24"
			}
			let temmp2=document.getElementsByClassName(inforouting[i].subClass)[1];
			if(temmp2){
				temmp2.style.color="white"
			}
		}
	 }
	 console.log(temp?.parentElement?.parentElement?.previousSibling)
	 if(temp) {temp.style.color="#F5C200";
	 newSrc="/onSelection/"+newSrc+".svg"
	console.log( temp.parentElement.parentElement.previousSibling.firstChild.src)
	temp.parentElement.parentElement.previousSibling.firstChild.src=newSrc
	}
	 if(temp1) temp1.style.backgroundColor="black"
	 if(temp2) temp2.style.color="#F5C200"
	  })
	  
	  

	
	var content = (
		
		<Scrollbar
			sx={{
				height: "100%",
				"& .simplebar-content": {
					height: "100%",
				},
				"& .simplebar-scrollbar:before": {
					background: "neutral.400",
				},
			}}
		>
			<Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
					backgroundColor: "#181F24",	
					
								
				}}
			>
				
				<Box
					sx={{
						py: 1,
						pl: 1
					}}
				>
					<Box
						component={NextLink}
						href="/"
						sx={{
							display: "flex",
							justifyContent: "flex-start"
						}}
						p={0} m={0}
					>
						
					</Box>
				</Box>
				<Box py={5}
				sx={{
					display: "flex",
					flexDirection: "column",
					textAlign: "left",
					paddingLeft: "12px",
				}} >
					<Typography fontFamily="Poppins, sans-serif" fontSize={16} fontWeight={700} pb={1.5}>Hi John!</Typography>
					<Typography fontFamily="Poppins, sans-serif" fontSize={12} fontWeight={400}>Ready to tackle another day on a project?</Typography>


				</Box>
				
				<Box
					component="nav"
					sx={{
						flexGrow: 1,
						px: 2,
						py: 3,
					}}
				>
					<Stack
						component="ul"
						spacing={0.5}
						sx={{
							listStyle: "none",
							p: 0,
							m: 0,
						}}
					>
						{/* {items.map((item) => {
							const active = item.path
								? pathname === item.path
								: false;

							return (
								<SideNavItem
									active={active}
									disabled={item.disabled}
									external={item.external}
									icon={item.icon}
									key={item.title}
									path={item.path}
									title={item.title}
								/>
							);
						})}
						 */}
						<ListItemButton component={NextLink} href="/">
							<ListItemIcon>
								<img width={20} src="/Dashboard.svg"></img>
							</ListItemIcon>
							<ListItemText >
								<StyledTypography className="Dashboard" fontSize={16}>Dashboard</StyledTypography>
							</ListItemText>
						</ListItemButton>

						<ListItemButton
							onClick={() => setOpenProject(!openProject)}
						>
							<ListItemIcon>
								<img width={20} src="/Project.svg"></img>
							</ListItemIcon>
							<ListItemText  >
							<StyledTypography className="Project" fontSize={16}>Projects</StyledTypography>
								</ListItemText>
							{openProject ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={openProject} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton
									component={NextLink}
									href="/projects"
									sx={{ pl: 4,}}
									className="My_Projects"
								>
									<ListItemText className="My_Projects" primary="My Projects" />
								</ListItemButton>
								
								
							</List>
						</Collapse>
						<ListItemButton
							onClick={() => setOpenScope(!openScope)}
						>
							<ListItemIcon>
								<img width={20} src="/ScopeManagement.svg"></img>
							</ListItemIcon>
							<ListItemText>
							<StyledTypography className="ScopeManagement" fontSize={16}>Scope Management</StyledTypography>
							</ListItemText>
							{openScope ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>

						<Collapse in={openScope} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								
								<ListItemButton
									component={NextLink}
									href="/gantt-chart"
									sx={{ pl: 4 }}
									className="GanttChart"
								>
									<ListItemText className="GanttChart" primary="Gantt Chart" />
								</ListItemButton>
							
							</List>
						</Collapse>

						<Collapse in={openScope} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								
								<ListItemButton
									component={NextLink}
									href="/kanban"
									sx={{ pl: 4 }}
									className="Kanban"
								>
									<ListItemText className="Kanban" primary="Kanban Board" />
								</ListItemButton>
							
							</List>
						</Collapse>

						{/* <ListItemButton
							onClick={() =>
								setOpenTimeManagement(!openTimeManagement)
							}
						>
							<ListItemText primary="Time Management" />
							{openTimeManagement ? (
								<ExpandLess />
							) : (
								<ExpandMore />
							)}
						</ListItemButton>
						<Collapse
							in={openTimeManagement}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								<ListItemButton
									component={NextLink}
									href="/timeline"
									sx={{ pl: 4 }}
								>
									<ListItemText primary="Timeline" />
								</ListItemButton>
								<ListItemButton
									component={NextLink}
									href="/delay-prediction"
									sx={{ pl: 4 }}
								>
									<ListItemText primary="Delay Prediction" />
								</ListItemButton>
								<ListItemButton
									component={NextLink}
									href="/gantt-chart"
									sx={{ pl: 4 }}
								>
									<ListItemText primary="Gantt Chart" />
								</ListItemButton>
							</List>
						</Collapse> */}
						{/* <ListItemButton
							onClick={() =>
								setOpenBudgetManagement(!openBudgetManagement)
							}
						>
							<ListItemText primary="Budget Management" />
							{openBudgetManagement ? (
								<ExpandLess />
							) : (
								<ExpandMore />
							)}
						</ListItemButton> */}
						
						
						
					</Stack>
				</Box>
			</Box>
		</Scrollbar>
	);
	if(localisMinimised){
		content = (
			<Scrollbar
			  sx={{
				height: "100%",
				"& .simplebar-content": {
				  height: "100%",
				},
				"& .simplebar-scrollbar:before": {
				  background: "neutral.400",
				},
			  }}
			>
			  <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
			  
				sx={{
				  display: "flex",
				  flexDirection: "column",
				  height: "100%",
				  backgroundColor: "#181F24",
				 
				  
				}}
			  >
				<Box
				  sx={{
					py: 2,
					pl: 1,
				  }}
				>
				  
				</Box>
				<Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
			
				</Box>
				<Box
				  py={2}
				  sx={{
					display: "flex",
					flexDirection: "column",
					textAlign: "center",
					//paddingLeft: "12px",
				  }}
				>
				  <Typography fontFamily="Poppins, sans-serif" textAlign={"center"} fontSize={16} fontWeight={700} pb={1.5}>
					Hi John!
				  </Typography>
				</Box>
				<Box
				  component="nav"
				  sx={{
					flexGrow: 1,
					//px: 2,
					py: 1,
				  }}
				>
				  <Stack
					component="ul"
					spacing={0.5}
					sx={{
					  listStyle: "none",
					  p: 0,
					  m: 0,
					}}
				  >
					<Button sx={{paddingY: "25px"}} component={NextLink} href="/">
					  <img style={{margin: "auto"}} width={20} src="/Dashboard.svg" alt="home-icon" />
					</Button>
		  
					<Button sx={{paddingY: "25px"}}  onClick={() => setOpenProject(!openProject)}>
					  <img width={20} src="/Project.svg" alt="layout-icon" />
					</Button>
		  
					<Button sx={{paddingY: "25px"}}  onClick={() => setOpenScope(!openScope)}>
					  <img width={20} src="/onSelection/ScopeManagement.svg" alt="layers-icon" />
					</Button>
		  
					<Button sx={{paddingY: "25px"}}  onClick={() => setOpenCostEstimate(!openCostEstimate)}>
					  <img width={20} src="/CostManagement.svg" alt="cost-icon" />
					</Button>
		  
					<Button sx={{paddingY: "25px"}} onClick={() => setOpenResourceManagement(!openResourceManagement)}>
					  <img width={20} src="/ResourceMangementMain.svg" alt="group-icon" />
					</Button>
		  
					<Button sx={{paddingY: "25px"}} onClick={() => setOpenReports(!openReports)}>
					  <img width={20} src="/Reports.svg" alt="reports-icon" />
					</Button>
		  
					<Button sx={{paddingY: "25px"}} onClick={() => setOpenDocumentManagement(!openDocumentManagement)}>
					  <img width={20} src="/DocumentManagement.svg" alt="document-icon" />
					</Button>
		  
					<Button sx={{paddingY: "25px"}} component={NextLink} href="/integration">
					  <img width={20} src="/Vector (3).svg" alt="integration-icon" />
					</Button>
		  
					<Button sx={{paddingY: "25px"}} onClick={() => setOpenSettings(!openSettings)}>
					  <img width={20} src="/Vector (4).svg" alt="settings-icon" />
					</Button>
				  </Stack>
				</Box>
			  </Box>
			</Scrollbar>
		  );
		  
		  
	}

	if (lgUp && localisMinimised) {
		return (
			<Drawer
				anchor="left"
				open
				PaperProps={{
					sx: {
						backgroundColor: "#181F24",
						color: "common.white",
						width: 100,
					},
				}}
				variant="permanent"
			>
				{content}
			</Drawer>
		);
	}
	else if(lgUp){
		return (
			<Drawer
				anchor="left"
				open
				PaperProps={{
					sx: {
						backgroundColor: "#181F24",
						color: "common.white",
						width: 300,
					},
				}}
				variant="permanent"
			>
				{content}
			</Drawer>
		);
	}

	return (
		<Drawer
			anchor="left"
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					backgroundColor: "#181F24",
					color: "common.white",
					width: 280,
				},
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant="temporary"
		>
			{content}
		</Drawer>
	);
};

SideNav.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
	isMinimised: PropTypes.bool
};
