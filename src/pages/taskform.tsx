import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
	Card,
	CardContent,
	CardMedia,
	CardActions
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
import Link from "next/link.js";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from "next/router";
// format(new Date(2014, 1, 11), "MM/dd/yyyy");

import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { start } from "repl";
import { userGetter, tokenGetter } from "../utils/idgetter"
import CircularLoader from "@/components/CircularLoader.js";

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

	const [assignee, setAssignee] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [orgLoaded, setOrgLoaded] = useState(false);
	const [orgSelected, setOrgSelected] = useState(false);
	const [organisations, setOrganisations] = useState([]);
	const router = useRouter();
	// let orgSelected = false;
	useEffect(() => {
		const currentUrl = router.asPath;
		const urlAfterGanttChart = currentUrl.split('/taskform?')[1];
		setOrgSelected(urlAfterGanttChart ? true : false);
	}, [])

	async function asg(orgid) {
		const token = tokenGetter();
		const currentUrl = router.asPath;
		const urlAfterGanttChart = currentUrl.split('/taskform?')[1];
		const data = {
			organisationID: orgid
		}
		await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organisation/getMembers/` + urlAfterGanttChart, {
			headers: {
				'Authorization': 'Bearer ' + token
			}

		}
		)
			.then((res) => {
				console.log(res)
				setAssignee(res.data.data)

				setLoaded(true)
			})
	}
	
	async function org() {
		const data = {
			id: userGetter().id
		}
		const token = tokenGetter();
		await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getuser`, {
			
			headers: {
				'Authorization': 'Bearer ' + token
			}

		}
		)
			.then((res) => {
				setOrganisations(res.data.data.Memberships)
				setOrgLoaded(true)
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
				alert("ERR")
			})

	}




	const pastMonth = new Date();

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
			assignee: "",
			// organisation: "",
			startDate: "",
			endDate: "",
			progress: 0,
			title: "",
			description: "",
		},
		validationSchema: Yup.object({
			assignee: Yup.string().required("Assignee is required"),
			// organisation: Yup.string().required("Assignee is required"),
			startDate: Yup.string().required("Start Date is required"),
			endDate: Yup.string().required("End Date is required"),
			// managerName: Yup.string().required("Manager Name is required"),
			progress: Yup.number().required("Progress is required"),
			title: Yup.string().required("Title is required"),
			description: Yup.string().required("Desc required"),
		}),
		onSubmit: async (values, helpers) => {
			function formatDateToDateTime(dateString) {
				// Split the input string into day, month, and year
				const parts = dateString.split('/');
				// Create a new Date object (month is 0-based in JavaScript, so subtract 1 from the month)
				const date = new Date(parts[2], parts[1] - 1, parts[0]);
				// Convert the date to your desired format, for example:
				const dateTimeString = date.toISOString(); // This will give you a date-time string in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
				return dateTimeString;
			}
			const currentUrl = router.asPath;
			const urlAfterGanttChart = currentUrl.split('/taskform?')[1];
			let data = JSON.stringify({
				"Title": values.title,
				"Description": values.description,
				"OrganizationId": urlAfterGanttChart,
				"StartDate": formatDateToDateTime(values.startDate),
				"assigneeId": values.assignee,
				"EndDate": formatDateToDateTime(values.endDate),
				"Points": 20,
				"dependentTasksIds": []
			});
			const token = tokenGetter();

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/task/create`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '+token
				},
				data: data
			};

			axios.request(config)
				.then((response) => {
					alert("TASK CREATED")
					console.log(JSON.stringify(response.data));
				})
				.catch((error) => {
					alert("ERROR")
					console.log(error);
				});
			// submiter()
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
	if (!orgLoaded) {
		org();
	}
	if (!orgSelected) {
		console.log(organisations);
		return (
			<Grid container spacing={2}>
				{organisations?.map((item, index) => (
					
					<Grid xs={4} mt={2}>
						<a href={`/taskform?${item.Organization.id}`}>
							<Card key={index} sx={{ marginRight: 5 }}>
								<CardMedia
									sx={{ height: 300 }}
									image="https://picsum.photos/500/500"
									title="green iguana"
								/>
								<CardContent>
									<Typography variant="h5" component="div">
										{item.Organization.Name}
									</Typography>
								</CardContent>
							</Card></a> </Grid>
				))}
			</Grid>
		);
	}


	// return <h1>HEYGy</h1>


	else if (!loaded) {
		const currentUrl = router.asPath;
  const urlAfterForm = currentUrl.split('/taskform?')[1];
		asg(urlAfterForm)
		return <CircularLoader />
	}
	else {

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
						<Typography style={{ margin: "12px", textAlign: "center" }}>
							Please fill in the Form to continue
						</Typography>
						<Grid container spacing={2}>
							<Grid xs={4} mt={3}>


								<InputLabel id="demo-simple-select-label">Assignee</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									error={
										!!(
											formik.touched.assignee &&
											formik.errors.assignee
										)
									}
									helperText={
										formik.touched.assignee &&
										formik.errors.assignee
									}
									name="assignee"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.assignee}

								>
									{
										assignee.map((item, indes) => {
											return (
												<MenuItem value={item.id}>{item.User.Email}</MenuItem>
											)
										})
									}

								</Select>
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
								<Typography ml={2}>Enter Title</Typography>
								<TextField
									id="standard-basic"
									sx={{ width: "80%", marginLeft: "18px" }}

									variant="standard"
									error={
										!!(
											formik.touched.title &&
											formik.errors.title
										)
									}
									helperText={
										formik.touched.title &&
										formik.errors.title
									}
									name="title"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.title}
								/>
							</Grid>
							<Grid xs={4}>
								<Typography ml={2}>Description</Typography>
								<TextField
									id="standard-basic"
									sx={{ width: "80%", marginLeft: "18px" }}

									variant="standard"
									error={
										!!(
											formik.touched.description &&
											formik.errors.description
										)
									}
									helperText={
										formik.touched.description &&
										formik.errors.description
									}
									name="description"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.description}
								/>
							</Grid>
							<Grid xs={4}>
								<Typography ml={2}>Enter Progress</Typography>
								<TextField
									id="standard-basic"
									sx={{ width: "80%", marginLeft: "18px" }}

									variant="standard"
									error={
										!!(
											formik.touched.progress &&
											formik.errors.progress
										)
									}
									helperText={
										formik.touched.progress &&
										formik.errors.progress
									}
									name="projectValue"
									type="number"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.projectValue}
								/>
							</Grid>


							<Grid xs={4} mt={6} mb={6}>

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
}

Temp.getLayout = (page) => (
	<DashboardLayout isMinimised={true}>{page}</DashboardLayout>
);

export default Temp;