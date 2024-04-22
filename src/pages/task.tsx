import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Theme, useTheme } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Grid,
	OutlinedInput,
	TextField,
	Button,
	List,
	ListItem,
	ListItemButton,
} from "@mui/material";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout.tsx";
import { Layout as Nested } from "../layouts/dashboard/temp.tsx";
import { UserChat } from "../components/user_chat.js";
import { BotChat } from "../components/bot_chat.js";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { DateTimePicker } from "formik-mui-lab";
import { Formik, Form, Field } from "formik";
import { format, addDays } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link.js";
// format(new Date(2014, 1, 11), "MM/dd/yyyy");

import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { start } from "repl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

async function getmembers() {
	const names = await axios.post('https://se-backend-xkt0.onrender.com/api/v1/organisation/getMembers')
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

let projects = [];

const historyy = [
	{
		time: "Today",
		content: [],
	},
	{
		time: "Yesterday",
		content: [],
	},
	{
		time: "Previous 7 days",
		content: [],
	},
	{
		time: "Earlier",
		content: [],
	},
];

function Temp() {
	const [history, setHistory] = useState(historyy);
	const [errmsg, setErrmsg] = useState("");

	// if(chat){
	//   console.log(chat)
	// chat.map((item, index) => {
	//   var date_item = new Date(item.Project_Date.substring(0, 10));
	//   var today = new Date();
	//   var difference = today.getTime() - date_item.getTime();
	//   var differenceInDays = Math.ceil(difference / (1000 * 3600 * 24));
	//   if (differenceInDays === 1 || differenceInDays === 0) {
	//     for (let i = 0; i < history.length; i++) {
	//       if (history[i].time === "Today") {
	//         history[i].content.push(item.Project_Name);
	//       }
	//     }
	//   } else if (differenceInDays === 2) {
	//     for (let i = 0; i < history.length; i++) {
	//       if (history[i].time === "Yesterday") {
	//         history[i].content.push(item.Project_Name);
	//       }
	//     }
	//   } else if (differenceInDays <= 7) {
	//     for (let i = 0; i < history.length; i++) {
	//       if (history[i].time === "Previous 7 days") {
	//         history[i].content.push(item.Project_Name);
	//       }
	//     }
	//   } else {
	//     for (let i = 0; i < history.length; i++) {
	//       if (history[i].time === "Earlier") {
	//         history[i].content.push(item.Project_Name);
	//       }
	//     }
	//   }
	// });

	// console.log(history)
	// }
	const toolslist = [
		{
			imgsrc: "/photo.svg",
			title: "Add Project",
			desc: "Create a  new project for collaboration and development.",
		},
		{
			imgsrc: "/photo.svg",
			title: "Create Scope From Contract",
			desc: "Form project scope using contract details in your management software.",
		},
		{
			imgsrc: "/photo.svg",
			title: "Create Scope From Tender",
			desc: "Scope from tender: create in project software.",
		},
		{
			imgsrc: "/photo.svg",
			title: "Open a P6 XER File",
			desc: "Use Primavera P6 or a compatible app to open XER files.",
		},
		{
			imgsrc: "/photo.svg",
			title: "Connect a P6 XER File",
			desc: "Connect a P6 file in Primavera P6 or a compatible program.",
		},
	];

	const router = useRouter();

	const renderedItems = history.map((item, index) => (
		<div
			style={{ marginBottom: "20px", textDecoration: "none" }}
			key={index}
		>
			<Typography
				fontFamily={"Poppins, sans-serif"}
				fontWeight={300}
				fontSize={12}
				color={"#7C7A67"}
			>
				{item.time}
			</Typography>
			<List>
				{item.content.map((contentItem, contentIndex) => (
					<Link href={`/scope?pid=${contentItem.Project_ID}`}>
						<ListItem disablePadding key={contentIndex}>
							<ListItemButton
								sx={{
									paddingLeft: "0px",
									borderRadius: "5px", // Set your desired highlight color
									"&:hover": {
										backgroundColor: "#FFE299", // Set your desired hover color
									},
								}}
							>
								<Typography
									sx={{
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}
									fontFamily={"Poppins,sans-serif"}
									fontSize={14}
									color="#131311"
									fontWeight={400}
									paddingY={0.15}
									paddingX={0.25}
								>
									{contentItem.Project_Name}
								</Typography>
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</div>
	));

	const varWdith = "80%";
	const toolslist1 = [
		{
			Option_ID: 1,
			Option_Name: "Loading... ",
			Option_Parent: null,
		},
	];
	const pastMonth = new Date();

	const [propmtPopup, setPromptPopup] = useState(false);
	const [toolsPopup, setToolsPopup] = useState(false);
	const [promptList, setPromptList] = useState(toolslist1);
	const [fullPromptList, setFullPromptList] = useState(toolslist1);
	const [isFormFilled, setFormFilled] = useState(true);
	const [value, onChange] = useState<Value>(new Date());
	const [tenderFile, setTenderFile] = useState(null);
	const [fileUploadError, setFileUploadError] = useState("");
	const [projectList, setProjectList] = useState([]);

	const defaultSelected: DateRange = {
		from: pastMonth,
		to: addDays(pastMonth, 4),
	};
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

	const formData = new FormData();
	const formik = useFormik({
		initialValues: {
			projectName: "",
			startDate: "",
			endDate: "",
			managerName: "",
			industry: "",
			projectValue: "",
			yourRole: "",
			submit: null,
		},
		validationSchema: Yup.object({
			projectName: Yup.string().required("Task name is required"),
			startDate: Yup.string().required("Start Date is required"),
			endDate: Yup.string().required("End Date is required"),
			// managerName: Yup.string().required("Manager Name is required"),
			industry: Yup.string().required("Industry is required"),
			projectValue: Yup.string().required("Project Value is required"),
			yourRole: Yup.string().required("Your Role is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				if (!tenderFile) {
					setFileUploadError("Please upload all required files");
				} else {
					setFileUploadError("");

					formData.append("projectName", values.projectName);
					formData.append("startDate", values.startDate);
					formData.append("endDate", values.endDate);
					formData.append("managerName", values.managerName);
					formData.append("industry", values.industry);
					formData.append("projectValue", values.projectValue);
					formData.append("yourRole", values.yourRole);
					formData.append("tender", tenderFile);
					// formData.append("contract", contractFile);
					// formData.append("document", documentFile);
					await axios
						.post(
							`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/`,
							formData
						)
						.then((res) => {
							console.log(res);
							setFormFilled(true);
							router.push("scope?pid=" + res.data.id);
						})
						.catch((err) => setErrmsg(err.response.data.message));
				}
			} catch (err) {
				alert("Error");
			}
		},
	});

	// useEffect(()=>{
	// 	alert("Called");
	// }, [dataLoaded])

	const chatContainerRef = useRef<HTMLDivElement | null>(null);

	let footer = <p>Please pick the first day.</p>;
	if (range?.from) {
		if (!range.to) {
			footer = <p>{format(range.from, "PPP")}</p>;
			formik.values.startDate = format(range.from, "dd/MM/yyyy");
		} else if (range.to) {
			formik.values.startDate = format(range.from, "dd/MM/yyyy");
			formik.values.endDate = format(range.to, "dd/MM/yyyy");
			footer = (
				<p>
					{format(range.from, "PPP")}–{format(range.to, "PPP")}
				</p>
			);
		}
	}

	const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
	return (
		<form noValidate onSubmit={formik.handleSubmit}>
			<div
				style={{
					backgroundColor: "#FCF8F0",
					height: "100%",
					margin: "25px",
					marginTop: "0px",
					marginBottom: "0px",
					borderRadius: "20px",
					display: "flex",
					flexDirection: "column",
					overflowY: "auto",
					scrollbarWidth: "thin",
					scrollbarColor: "#FFE299 #FCF8F0 ",
					maxHeight: "90vh ",
				}}
			>
				<div style={{ marginLeft: "25px" }}>
					
					<Grid container spacing={2}>
						<Grid xs={4} mt={3}>

							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px"}}
								label="Task Name"
								variant="standard"
								error={
									!!(
										formik.touched.projectName &&
										formik.errors.projectName
									)
								}
								helperText={
									formik.touched.projectName &&
									formik.errors.projectName
								}
								name="projectName"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.projectName}
							/>
						</Grid>
						<Grid>
						<div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
						</Grid>
						<Grid
							xs={8}
							mt={3}
							direction={"column"}
							alignItems={"center"}
							justifyContent={"center"}
						>
							<Typography textAlign={"center"} ml={2}>
								Date Range
							</Typography>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									width: "100%",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{formik.errors.startDate && (
									<p
										style={{
											color: "red",
											marginLeft: "12px",
										}}
									>
										{formik.errors.startDate}
									</p>
								)}
								<DayPicker
									id="test"
									mode="range"
									defaultMonth={pastMonth}
									selected={range}
									footer={footer}
									onSelect={(e) => {
										setRange(e);
										if (e) {
											if (e.from) {
												formik.values.startDate =
													format(
														e.from,
														"dd/MM/yyyy"
													);
											}
											if (e.to) {
												formik.values.endDate = format(
													e.to,
													"dd/MM/yyyy"
												);
											}
										}
									}}
									captionLayout="dropdown-buttons"
									fromYear={2000}
									toYear={2100}
								/>
							</div>
						</Grid>

						<Grid xs={4}>
							
							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								label="Description"
								variant="standard"
								error={
									!!(
										formik.touched.managerName &&
										formik.errors.managerName
									)
								}
								helperText={
									formik.touched.managerName &&
									formik.errors.managerName
								}
								name="managerName"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.managerName}
							/>
						</Grid>
						<Grid xs={4}>

							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								label="Assignee"
								variant="standard"
								error={
									!!(
										formik.touched.industry &&
										formik.errors.industry
									)
								}
								helperText={
									formik.touched.industry &&
									formik.errors.industry
								}
								name="industry"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.industry}
							/>
						</Grid>
						<Grid xs={4}>
							
							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								label="Task Weights"
								variant="standard"
								error={
									!!(
										formik.touched.projectValue &&
										formik.errors.projectValue
									)
								}
								helperText={
									formik.touched.projectValue &&
									formik.errors.projectValue
								}
								name="projectValue"
								type="number"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.projectValue}
							/>
						</Grid>
						<Grid xs={4} mt={6} mb={6}>
							<Typography ml={2}>Your Role</Typography>
							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								variant="standard"
								error={
									!!(
										formik.touched.yourRole &&
										formik.errors.yourRole
									)
								}
								helperText={
									formik.touched.yourRole &&
									formik.errors.yourRole
								}
								name="yourRole"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.yourRole}
							/>
						</Grid>

						
					</Grid>
					<Box
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						mb={5}
						flexDirection={"column"}
					>
						<Typography color={"red"}>{fileUploadError}</Typography>
						<Typography color={"red"}>{errmsg}</Typography>
						<Button
							sx={{ width: "20%" }}
							variant="contained"
							type="submit"
							color="success"
						>
							Submit
						</Button>
					</Box>
				</div>
			</div>
		</form>
	);
}

Temp.getLayout = (page) => (
	<DashboardLayout isMinimised={true}>{page}</DashboardLayout>
);

export default Temp;