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
			company_id: "",
			email: "",
			name: "",
			password: "",
			submit: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Must be a valid email")
				.max(255)
				.required("Email is required"),
			company_id: Yup.string().max(10).required("Company ID is required"),
			name: Yup.string().max(255).required("Name is required"),
			password: Yup.string().max(255).required("Password is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await auth.signUp(
					values.company_id,
					values.email,
					values.name,
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
							<Typography fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={14} paddingBottom={0.25} color={"#868683"}>Company ID</Typography>
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
										formik.touched.name &&
										formik.errors.name
									)
								}

								helperText={
									formik.touched.name &&
									formik.errors.name
								}
								/*label="Company ID"*/
								name="company_id"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.company_id}
							/>

							<Typography fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={14} paddingBottom={0.25} color={"#868683"}>Your Full Name</Typography>
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
										formik.touched.name &&
										formik.errors.name
									)
								}
								fullWidth
								helperText={
									formik.touched.name &&
									formik.errors.name
								}
								label="Name"
								name="name"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.name}
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
