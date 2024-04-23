import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	Alert,
	FormHelperText,
	Tab,
	Tabs,
	Box,
	Button,
	Link,
	OutlinedInput,
	Stack,
	TextField,
	Typography,
	Grid,
	Checkbox
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import InputAdornment from '@mui/material/InputAdornment';
import Image from "next/image";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Page = () => {
	const router = useRouter();
	const auth = useAuth();
	const formik = useFormik({
		initialValues: {
			email: "buddhadevom@gmail.com",
			password: "Password321",
			submit: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Must be a valid email")
				.max(255)
				.required("Email is required"),
			password: Yup.string().max(255).required("Password is required"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await auth.signIn(values.email, values.password);
				router.push("/");
			} catch (err) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		},
	});

	

	

	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<Box sx={{ backgroundColor: "white", border: "1", borderRadius: "16px", display: "flex", flexDirection: "column" }}>
				<Box paddingX={10} paddingY={5} >
					<Typography
						fontFamily={'Poppins, sans-serif'}
						fontSize={40}
						fontWeight={600}
						color={"#394345"}>
						Welcome Back!
					</Typography>
					<Typography
						fontFamily={"Poppins, sans-serif"}
						textAlign={"center"}
						fontSize={16}
						fontWeight={400}
					>
						Please input your details
					</Typography>
					{ (
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


								<Typography fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={14} paddingBottom={0.25} color={"#868683"}>Password</Typography>
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
							<Grid
							pt={2}
								container
								direction="row"
								justifyContent="space-between"
								alignItems="center"
							>
								<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}  >
									<Checkbox  sx={{margin:"0", padding: "0", marginRight: "2px	"}}  {...label} defaultChecked size="small" />
									<Typography fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={14} color={"#404040"}> Remember me</Typography>
								</Box>
								<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} >
									
								<Typography fontFamily={'Poppins, sans-serif'} fontWeight={600} fontSize={14} color={"#181F24"}> Forgot Password</Typography>
								</Box>
								

							</Grid>
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
								<Typography fontFamily={'Poppins, sans-serif'} fontWeight={500} color={"#131311"} fontSize={16}>Create Account</Typography>
							</Button>

							<Typography textAlign={"center"} fontFamily={'Poppins, sans-serif'} fontWeight={400} fontSize={16}>Don't have an account? <Link href="/auth/register"><span style={{ fontWeight: "700", color: "black", textDecoration: "none" }}>Sign Up</span></Link></Typography>

							
						</form>
					)}
				</Box>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
