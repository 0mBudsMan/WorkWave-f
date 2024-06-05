import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box, Typography, Grid } from "@mui/material";
import { Logo } from "src/components/logo";
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/400.css';
import { useRouter } from "next/router";

export const Layout = (props) => {
	
	const { children } = props;
	const router = useRouter();

	const isLoginPage = router.pathname === '/auth/login';
	//alert(isLoginPage)

	return (
		<Grid container spacing={2} sx={{
			backgroundImage: `url("/login_bg.png")`,
			backgroundSize: 'cover', backgroundRepeat: "no-repeat", backgroundPosition: "center",
			minHeight: "100vh",
			maxWidth: "100vw",
			margin: 0,
			padding: 0,
		}}>
			<Grid item lg={6} md={12} sm={12} sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}>
				<Typography mb={1.25} fontFamily={'Poppins, sans-serif'} color={"#F3F3F3"} fontWeight={600} fontSize={40} >Welcome to <span style={{color: "#F5C200"}}>WorkWave</span></Typography>
				{isLoginPage && <Typography fontFamily={'Poppins, sans-serif'} color={"#F3F3F3"} fontWeight={400} fontSize={20}>Ready to tackle another day on a project?</Typography>}
				{!isLoginPage && <Typography fontFamily={'Poppins, sans-serif'} color={"#F3F3F3"} fontWeight={400} fontSize={20}></Typography>}
			</Grid>
			<Grid item lg={6} md={12} sm={12} sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}>
				{children}
			</Grid>
		</Grid>
	);
};

Layout.prototypes = {
	children: PropTypes.node,
};
