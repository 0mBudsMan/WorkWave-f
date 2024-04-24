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
		const urlAfterGanttChart = currentUrl.split('/add?')[1];
		setOrgSelected(urlAfterGanttChart ? true : false);
	}, [])

	async function asg(orgid) {
		const token = tokenGetter();
		const currentUrl = router.asPath;
		const urlAfterGanttChart = currentUrl.split('/add?')[1];
		const data = {
			organisationID: orgid
		}
		await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getusers/`, {
			headers: {
				'Authorization': 'Bearer ' + token
			}

		}
		)
			.then((res) => {
				console.log(res)
				setAssignee(res.data.data)
				console.log(res.data.data)
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
			role: ""
		},
		validationSchema: Yup.object({
			assignee: Yup.string().required("Assignee is required"),
			// organisation: Yup.string().required("Assignee is required")
			role: Yup.string().required("Role is required"),
			
		}),
		onSubmit: async (values, helpers) => {
			console.log(values)
			// submiter()const currentUrl = router.asPath;
			const currentUrl = router.asPath;
		const urlAfterGanttChart = currentUrl.split('/add?')[1];
			const data = {
				OrganisationId: urlAfterGanttChart,
				userId: values.assignee,
				userRole: values.role
			}
			const token = tokenGetter();
				
				const config = {
					headers: { Authorization: `Bearer ${token}` }
				};
			await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organisation/addMember`,data,config)
			.then((res)=>{
				alert("ADDED")
			})
			.catch((err)=>{
				alert("ERR")
			})
		},
	});

	// useEffect(()=>{
	// 	alert("Called");
	// }, [dataLoaded])

	const chatContainerRef = useRef<HTMLDivElement | null>(null);

	
	if (!orgLoaded) {
		org();
	}
	if (!orgSelected) {
		console.log(organisations);
		return (
			<Grid container spacing={2}>
				{organisations?.map((item, index) => (
					
					<Grid xs={4} mt={2}>
						<a href={`/add?${item.Organization.id}`}>
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
  const urlAfterForm = currentUrl.split('/add?')[1];
		asg(urlAfterForm)
		return <CircularLoader />
	}
	else {
		console.log(assignee)
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
												<MenuItem value={item.id}>{item.FirstName + " " + item.LastName}</MenuItem>
											)
										})
									}

								</Select>
							</Grid>
							<Grid xs={11} mt={3}>


								<InputLabel id="demo-simple-select-label">Role</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									error={
										!!(
											formik.touched.role &&
											formik.errors.role
										)
									}
									helperText={
										formik.touched.role &&
											formik.errors.role
									}
									name="role"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.role}

								>
									
									<MenuItem value="ASSIGNEE">{"ASSIGNEE"}</MenuItem>
									<MenuItem value="ASSIGNER">{"ASSIGNER"}</MenuItem>

								</Select>
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