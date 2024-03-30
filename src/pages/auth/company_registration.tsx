import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

const Page = () => {
	const router = useRouter();
	const auth = useAuth();
	const formik = useFormik({
		initialValues: {
			name: "",
			submit: null,
		},
		validationSchema: Yup.object({
			name: Yup.string().max(255).required("Name is required"),
		}),
		onSubmit: async (values, helpers) => {
			// try {
			// await auth.signUp(values.name);
			router.push("/");
			// } catch (err) {
			// 	helpers.setStatus({ success: false });
			// 	helpers.setErrors({ submit: err.message });
			// 	helpers.setSubmitting(false);
			// }
		},
	});

	return (
		<>
			<Head>
				<title>Register Company | ConstructMind AI</title>
			</Head>
			<Box
				sx={{
					flex: "1 1 auto",
					alignItems: "center",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						maxWidth: 550,
						px: 3,
						py: "100px",
						width: "100%",
					}}
				>
					<div>
						<Stack spacing={1} sx={{ mb: 3 }}>
							<Typography variant="h4">
								Register Company
							</Typography>
						</Stack>
						<form noValidate onSubmit={formik.handleSubmit}>
							<Stack spacing={3}>
								<TextField
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
								sx={{ mt: 3 }}
								type="submit"
								variant="contained"
							>
								Continue
							</Button>
						</form>
					</div>
				</Box>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
