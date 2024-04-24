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
} from "@mui/material";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout.tsx";
import { useRef, useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userGetter, tokenGetter } from "@/utils/idgetter.js";
import axios from "axios";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


function Temp() {
	
	
	const pastMonth = new Date();

	
	const [tenderFile, setTenderFile] = useState(null);
	const [fileUploadError, setFileUploadError] = useState("");
	const [projectList, setProjectList] = useState([]);
    const [errmsg, setErrMsg] = useState("")

	const defaultSelected: DateRange = {
		from: pastMonth,
		to: addDays(pastMonth, 4),
	};
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

	const formData = new FormData();
    const user = userGetter();
    async function updater(values){
        const token = tokenGetter();
        const dataa = {
            FirstName:  values.firstName,
            LastName: values.lastName,
            About: values.about,
            Bio: values.bio,
            City: values.city,
            State: values.state,
        };
        
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/updateuser`,
            dataa,
            config
        )
        .then((res)=>{
            alert("User Updated SUCCESSFULLY");
        })
        .catch((err)=>{
            
            alert("Error in updating user")
        })
    }
	const formik = useFormik({
		initialValues: {
			firstName: user.FirstName,
            lastName: user.LastName,
			about: user.About,
			bio: user.Bio,
			city: user.City,
			state: user.State,
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("First name is required"),
			lastName: Yup.string().required("Last Name is required"),
			about: Yup.string().required("About is required"),
			// managerName: Yup.string().required("Manager Name is required"),
			bio: Yup.string().required("Bio is required"),
			city: Yup.string().required("City is required"),
			state: Yup.string().required("State is required"),
		}),

		onSubmit: async (values, helpers) => {
            updater(values)
		},
	});


	const chatContainerRef = useRef<HTMLDivElement | null>(null);

	

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
						<Grid xs={4} mt={3} mb={3}>
							<Typography ml={2}>Enter First Name</Typography>
							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								
								variant="standard"
								error={
									!!(
										formik.touched.firstName &&
										formik.errors.firstName
									)
								}
								helperText={
									formik.touched.firstName &&
										formik.errors.firstName
								}
								name="firstName"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.firstName}
							/>
						</Grid>
						

						<Grid xs={4} mt={3} mb={3}>
							<Typography ml={2} >Enter Last Name</Typography>
							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								
								variant="standard"
								error={
									!!(
										formik.touched.lastName &&
										formik.errors.lastName
									)
								}
								helperText={
									formik.touched.lastName &&
										formik.errors.lastName
								}
								name="lastName"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.lastName}
							/>
						</Grid>
						<Grid xs={4} mt={3} mb={3}>
							<Typography ml={2} >About</Typography>
							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								
								variant="standard"
								error={
									!!(
										formik.touched.about &&
										formik.errors.about
									)
								}
								helperText={
									formik.touched.about &&
									formik.errors.about
								}
								name="about"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.about}
							/>
						</Grid>
						<Grid xs={4} mt={3} mb={3}>
							<Typography ml={2}>Enter Bio</Typography>
							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								
								variant="standard"
								error={
									!!(
										formik.touched.bio &&
										formik.errors.bio
									)
								}
								helperText={
									formik.touched.bio &&
									formik.errors.bio
								}
								name="bio"
								
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.bio}
							/>
						</Grid>
                        <Grid xs={4} mt={3} mb={3}>
							<Typography ml={2}>Enter City</Typography>
							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								
								variant="standard"
								error={
									!!(
										formik.touched.city &&
										formik.errors.city
									)
								}
								helperText={
									formik.touched.city &&
									formik.errors.city
								}
								name="city"
								type="string"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.city}
							/>
						</Grid>
						

						<Grid xs={4} mt={3} mb={3}>
							<Typography ml={2}>Enter State</Typography>
							<TextField
								id="standard-basic"
								sx={{ width: "80%", marginLeft: "18px" }}
								
								variant="standard"
								error={
									!!(
										formik.touched.bio &&
										formik.errors.bio
									)
								}
								helperText={
									formik.touched.state &&
									formik.errors.state
								}
								name="state"
								
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.state}
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
