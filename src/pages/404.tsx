import Head from "next/head";
import NextLink from "next/link";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/500.css';

const Page = () => (
	<>
		<Head>
			<title>404 | ConstructMind AI</title>
		</Head>
		<Box
			component="main"
			sx={{
				alignItems: "center",
				display: "flex",
				flexGrow: 1,
				minHeight: "100%",
			}}
		>
			<Container maxWidth="md">
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Box
						sx={{
							mb: 3,
							textAlign: "center",
						}}
					>
						<img
							alt="Under development"
							src="/404.svg"
							style={{
								display: "inline-block",
								maxWidth: "100%",
								width: 400,
							}}
						/>
					</Box>
					<Typography align="center" sx={{ mb: 3 }} fontFamily={'Poppins, sans-serif'} fontWeight={600} fontSize={40}>
						Hi... It looks like you are lost
					</Typography>
					<Typography
						align="center"
						color="text.secondary"
						variant="body1"
						fontFamily={'Poppins, sans-serif'}
						fontWeight={400}
						fontSize={16}
					>
						You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
					</Typography>
					<Button
						component={NextLink}
						
						href="/"
						startIcon={
							<SvgIcon fontSize="small">
								<ArrowLeftIcon color="#181F24" />
							</SvgIcon>
						}
						sx={{ mt: 3 }}
						variant="contained"
					>
						<Typography fontFamily={'Poppins, sans-serif'}
						fontWeight={400}
						fontSize={16} color={"#181F24"}> Go back to dashboard</Typography>
					</Button>
				</Box>
			</Container>
		</Box>
	</>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
