import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { withAuthGuard } from "src/hocs/with-auth-guard";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { Box, Container, Stack } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";

const SIDE_NAV_WIDTH = 280;

function Copyright() {
	return (
		<Typography variant="body2" color="white">
			{"Copyright © "}
			<Link
				style={{
					color: "#ffc93c",
				}}
				color="inherit"
				href="https://mui.com/"
			>
				ConstructMind
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const LayoutRoot = styled("div")(({ theme }) => ({
	display: "flex",
	flex: "1 1 auto",
	maxWidth: "100%",
	[theme.breakpoints.up("lg")]: {
		paddingLeft: SIDE_NAV_WIDTH,
	},
}));

const LayoutContainer = styled("div")({
	display: "flex",
	flex: "1 1 auto",
	flexDirection: "column",
	width: "100%",
});

export const Layout = withAuthGuard(({ isMinimised, children, ...otherProps }) => {
	//const { children, isMinimised } = props;
	//alert(isMinimised)
	const pathname = usePathname();
	const [openNav, setOpenNav] = useState(false);

	const handlePathnameChange = useCallback(() => {
		if (openNav) {
			setOpenNav(false);
		}
	}, [openNav]);

	useEffect(
		() => {
			handlePathnameChange();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[pathname]
	);

	return (
		<>
			<TopNav onNavOpen={() => setOpenNav(true)} />
			<SideNav onClose={() => setOpenNav(false)} open={openNav} isMinimised={isMinimised} />
			<LayoutRoot>
				<LayoutContainer>{children}</LayoutContainer>
			</LayoutRoot>
			{/*<Stack
				direction="row"
				sx={{
					py: 3,
					ml: 30,
					mt: "20em",
					px: 4,
					width: "100%",
					backgroundColor: "#3a4345",
					color: "#fff",
				}}
			>
				<Container maxWidth="sm">
					<Typography variant="body1">ConstructMind </Typography>
					<Typography variant="body1">
						Powered by{" "}
						<a
							style={{ color: "#ffc93c" }}
							target="_blank"
							href="https://compassconsult.co/"
						>
							Compass Consult
						</a>{" "}
					</Typography>
					<Copyright />
				</Container>
				<Container maxWidth="sm">
					<Typography variant="body1">Support</Typography>
					<Typography variant="body1">Community</Typography>
					<Typography variant="body1">Education</Typography>
				</Container>
				<Container maxWidth="sm">
					<Typography variant="body1">Privacy Policy</Typography>
					<Typography variant="body1">Terms & Agreement</Typography>
				</Container>
			</Stack>*/}
		</>
	);
});
