import React, { useState } from 'react';
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';

const Page = () => {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const auth = useAuth();
	const formik = useFormik({
		initialValues: {
			First_Name: "",
			Last_Name: "",
			email: "",
			password: "",
			submit: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Must be a valid email")
				.max(255)
				.required("Email is required"),
			First_Name: Yup.string().max(15).required("First Name is required"),
			Last_Name: Yup.string().max(15).required("Last Name is required"),
			password: Yup.string().max(255).required("Password is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await auth.signUp(
					values.First_Name,
					values.Last_Name,
					values.email,
					values.password
				);
				router.push("/");
			} catch (err) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		},
	});

	return (
		<>
			<Head>
				<title>Register | ConstructMind AI</title>
			</Head>
			<Box sx={{ backgroundColor: "white", border: "1", borderRadius: "16px", display: "flex", flexDirection: "column" }}>
				<Box paddingX={10} paddingY={5} >
					<Typography
						fontFamily={'Poppins, sans-serif'}
						fontSize={40}
						fontWeight={600}
						color={"#394345"}>
						Create an account
					</Typography>
					<Typography
					    fontFamily={"Poppins, sans-serif"}
						textAlign={"center"}
						fontSize={16}
						fontWeight={400}
					>
						Please input your details
					</Typography>
					<form noValidate onSubmit={formik.handleSubmit} style={{ paddingTop: "25px" }}>
						<Stack spacing={3}>
							<Typography fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={14} paddingBottom={0.25} color={"#868683"}>First Name</Typography>
							<OutlinedInput
								sx={{
									'&[class*="MuiOutlinedInput-root"]': {
										m: 0,
										height: "40px"
									},
									// Add other styles as needed
								}}
								aria-describedby="outlined-weight-helper-text"
								inputProps={{
									'aria-label': 'weight',
								}}
								id="outlined-helperText"

								error={
									!!(
										formik.touched.First_Name &&
										formik.errors.First_Name
									)
								}

								helperText={
									formik.touched.First_Name &&
									formik.errors.First_Name
								}
								/*label="First Name"*/
								name="First_Name"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.First_Name}
							/>

							<Typography fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={14} paddingBottom={0.25} color={"#868683"}>Last Name</Typography>
							<OutlinedInput
								sx={{
									'&[class*="MuiOutlinedInput-root"]': {
										m: 0,
										height: "40px"
									},
									// Add other styles as needed
								}}
								aria-describedby="outlined-weight-helper-text"
								inputProps={{
									'aria-label': 'weight',
								}}
								id="outlined-helperText"

								error={
									!!(
										formik.touched.Last_Name &&
										formik.errors.Last_Name
									)
								}
								fullWidth
								helperText={
									formik.touched.Last_Name &&
									formik.errors.Last_Name
								}
								label="Last_Name"
								name="Last_Name"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.Last_Name}
							/>

							<Typography fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={14} paddingBottom={0.25}color={"#868683"}>Your Email Address</Typography>
							<OutlinedInput
								sx={{
									'&[class*="MuiOutlinedInput-root"]': {
										m: 0,
										height: "40px"
									},
									// Add other styles as needed
								}}
								aria-describedby="outlined-weight-helper-text"
								inputProps={{
									'aria-label': 'weight',
								}}
								id="outlined-helperText"
								error={
									!!(
										formik.touched.email &&
										formik.errors.email
									)
								}
								fullWidth
								helperText={
									formik.touched.email &&
									formik.errors.email
								}
								label="Email Address"
								name="email"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type="email"
								value={formik.values.email}
							/>

							<Typography fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={14} paddingBottom={0.25}color={"#868683"}>Password</Typography>
							<OutlinedInput
								sx={{
									'&[class*="MuiOutlinedInput-root"]': {
										m: 0,
										height: "40px"
									},
									// Add other styles as needed
								}}
								endAdornment={
									<InputAdornment position="end">
										<Image src="/eye.svg" style={{ cursor: 'pointer' }} width={20} height={20} alt="Eye Icon" onClick={() => setShowPassword(!showPassword)} />
											
									</InputAdornment>
								}
								error={
									!!(
										formik.touched.password &&
										formik.errors.password
									)
								}
								fullWidth
								helperText={
									formik.touched.password &&
									formik.errors.password
								}
								label="Password"
								name="password"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type={showPassword ? 'text' : 'password'}
								value={formik.values.password}
							/>
						</Stack>
						{formik.errors.submit && (
							<Typography
								color="error"
								sx={{ mt: 3 }}
								variant="body2"
							>
								{formik.errors.submit}
							</Typography>
						)}
						<Button
							fullWidth
							size="large"
							sx={{ mt: 3, mb: 2 }}
							type="submit"
							variant="contained"
							
							
						>
							<Typography  fontFamily={'Poppins, sans-serif'} fontWeight={500} color={"#131311"} fontSize={16}>Create Account</Typography>
						</Button>

						<Typography textAlign={"center"} fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={16}>Already have an account? <Link href="/auth/login"><span style={{fontWeight:"700", color: "black", textDecoration: "none"}}>Log in</span></Link></Typography>
					</form>

				</Box>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
