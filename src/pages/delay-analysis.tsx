import Image from "next/image";
import Head from "next/head";
import {
	Box,
	Button,
	Container,
	Unstable_Grid2 as Grid,
	SvgIcon,
	Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {
	GridToolbarContainer, GridToolbarExport, gridPaginatedVisibleSortedGridRowIdsSelector,
	gridSortedRowIdsSelector,
	gridExpandedSortedRowIdsSelector,
	useGridApiContext,
} from '@mui/x-data-grid';
import {ButtonGroup} from "@mui/material";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

const StyledDataGrid = styled(DataGrid)(() => ({
	height: '100% !important',
	'& .super-app-theme--cell': {
		borderBottom: '2px solid',
		borderColor: '#EAECF0'
	},
	'& .css-t89xny-MuiDataGrid-columnHeaderTitle': {
		fontFamily: "Poppins, sans-serif",
		fontWeight: '400 !important',
		fontSize: 14,
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		color: "rgba(102, 112, 133, 1)",
	},
	'& .MuiDataGrid-cell[data-field="activity_name"], & .MuiDataGrid-cell[data-field="currentDuration"], & .MuiDataGrid-cell[data-field="predictedDuration"], & .MuiDataGrid-cell[data-field="reason"]': {
		fontFamily: "Poppins, sans-serif",
		fontWeight: '500 !important',
		fontSize: 16,
		color: '#131311'
	},
	'& .MuiDataGrid-cell[data-field="endDate"]': {
		fontFamily: "Poppins, sans-serif",
		fontWeight: '400 !important',
		fontSize: 14,
		color: '#667085'
	},
	'& .MuiDataGrid-cell[data-field="startDate"],  & .MuiDataGrid-cell[data-field="endDate"]': {
		fontFamily: "Poppins, sans-serif",
		fontWeight: '400 !important',
		fontSize: 14,
		color: '#181F24'
	},
	'& .MuiDataGrid-virtualScroller': {
		overflow: 'auto',

		scrollbarWidth: 'thin',
		scrollbarColor: '#f0f0f0 #c4c4c4',
		'&::-webkit-scrollbar': {
			width: '4px',
			height: '4px'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#FFBF19',
			borderRadius: '4px',
		},
		'&::-webkit-scrollbar-track': {
			backgroundColor: '#c4c4c4',
		},

		height: '100%',
		position: '	relative',
		zIndex: 0,

	},

}))



const now = new Date();
const hoverButtonColor = "#ffd76f";

const columns: GridColDef[] = [
	{ field: "task_id", headerName: "Task Code", width: 150 },
	{ field: "activity_name", headerName: "Activity Name", width: 200 },
	{
		field: "currentDuration",
		headerName: "Current Dutation",
		//type: "string",
		width: 200,
	},
	{
		field: "predictedDuration",
		headerName: "Prediced Duration",
		//type: "string",
		width: 160,
	},
	{
		field: "endDate",
		headerName: "End Date",
		//type: "string",
		width: 160,
	},
	
	{
		field: "reason",
		headerName: "Reason",
		//type: "string",
		width: 300,
	},	
	{
		field: "actions",
		headerName: "Actions",
		//type: "string",
		width: 200,
		renderCell: (params) => (
			(params.row.actions === undefined) ? <>
			<Image src="/tick.svg" width="32" height="31" style={{marginRight: "15px"}}></Image>
			<Image src="/cross.svg" width="32" height="31"></Image></>
			:( (params.row.actions===1)?<Image src="/accepted.svg" width="80" height="40" style={{marginRight: "15px"}}></Image>:<Image src="/declined.svg" width="80" height="40"></Image>))
		
	},
	
	
];

const rows = [
	{
	  id: 1,
	  task_id: "EC00515",
	  activity_name: "Mechanicals",
	  currentDuration: 2,
	  predictedDuration: 3,
	  endDate: "4/4/2025",
	  reason: "Material Shortage",
	  actions: 1,
	},
	{
	  id: 2,
	  task_id: "EC00516",
	  activity_name: "Electricals",
	  currentDuration: 4,
	  predictedDuration: 5,
	  endDate: "5/5/2025",
	  reason: "Equipment Failure",
	  actions: 1,
	},
	{
	  id: 3,
	  task_id: "EC00517",
	  activity_name: "Plumbing",
	  currentDuration: 3,
	  predictedDuration: 3,
	  endDate: "6/6/2025",
	  reason: "Labor Shortage",
	  actions: 0
	},
	{
	  id: 4,
	  task_id: "EC00518",
	  activity_name: "Roofing",
	  currentDuration: 5,
	  predictedDuration: 4,
	  endDate: "7/7/2025",
	  reason: "Weather Conditions",
	  actions: 0
	},
	{
	  id: 5,
	  task_id: "EC00519",
	  activity_name: "Painting",
	  currentDuration: 2,
	  predictedDuration: 2,
	  endDate: "8/8/2025",
	  reason: "Supplier Delay",	
	},
	{
	  id: 6,
	  task_id: "EC00520",
	  activity_name: "Flooring",
	  currentDuration: 3,
	  predictedDuration: 3,
	  endDate: "9/9/2025",
	  reason: "Quality Issues",
	},
	{
	  id: 7,
	  task_id: "EC00521",
	  activity_name: "Insulation",
	  currentDuration: 2,
	  predictedDuration: 2,
	  endDate: "10/10/2025",
	  reason: "Design Change",
	},
	{
	  id: 8,
	  task_id: "EC00522",
	  activity_name: "Landscaping",
	  currentDuration: 4,
	  predictedDuration: 4,
	  endDate: "11/11/2025",
	  reason: "Material Unavailability",
	},
	{
	  id: 9,
	  task_id: "EC00523",
	  activity_name: "HVAC",
	  currentDuration: 3,
	  predictedDuration: 3,
	  endDate: "12/12/2025",
	  reason: "Equipment Malfunction",
	},
	{
	  id: 10,
	  task_id: "EC00524",
	  activity_name: "Framing",
	  currentDuration: 5,
	  predictedDuration: 6,
	  endDate: "1/1/2026",
	  reason: "Staffing Issues",
	},
	{
	  id: 11,
	  task_id: "EC00525",
	  activity_name: "Windows Installation",
	  currentDuration: 2,
	  predictedDuration: 3,
	  endDate: "2/2/2026",
	  reason: "Supplier Bankruptcy",
	},
	{
	  id: 12,
	  task_id: "EC00526",
	  activity_name: "Doors Installation",
	  currentDuration: 3,
	  predictedDuration: 3,
	  endDate: "3/3/2026",
	  reason: "Logistics Problems",
	},
	{
	  id: 13,
	  task_id: "EC00527",
	  activity_name: "Drywall",
	  currentDuration: 4,
	  predictedDuration: 4,
	  endDate: "4/4/2026",
	  reason: "Quality Control Issues",
	},
	{
	  id: 14,
	  task_id: "EC00528",
	  activity_name: "Carpentry",
	  currentDuration: 2,
	  predictedDuration: 2,
	  endDate: "5/5/2026",
	  reason: "Material Damage",
	},
	{
	  id: 15,
	  task_id: "EC00529",
	  activity_name: "Siding Installation",
	  currentDuration: 3,
	  predictedDuration: 3,
	  endDate: "6/6/2026",
	  reason: "Supplier Dispute",
	}
  ];
  

const ExportIcon = () => {
	return (
		<img src="export.svg"></img>
	)
}
const getRowsFromCurrentPage = ({ apiRef }) =>
	gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

const getFilteredRows = ({ apiRef }) => gridExpandedSortedRowIdsSelector(apiRef);
function CustomToolbar() {
	const apiRef = useGridApiContext();

	const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

	const buttonBaseProps = {
		color: 'primary',
		size: 'small',
		startIcon: <ExportIcon />,
	};
	const [varb1, setVarb1]=React.useState("contained")
const [varb2, setVarb2]=React.useState("outlined")
const buttonToggle = () => {
	if(varb1=="contained") setVarb1("outlined")
	else setVarb1("contained")
	if(varb2=="contained") setVarb2("outlined")
	else setVarb2("contained")
}
	return (
		<GridToolbarContainer>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					my: "2em",
					width: "900vw"
				}}
			>
				<Box sx={{width: "650px"}}>
				<Typography fontFamily={"Poppins,sans-serif"} fontWeight={700} fontSize={30} color={"#131311"}>Delay Analysis</Typography>
				<Typography fontFamily={"Poppins,sans-serif"} fontWeight={400} fontSize={16} color={"#131311"}>After analyzing similar projects, following are the activities that have high probability of change</Typography></Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",

					}}>
					<Autocomplete
						sx={{ width: 250, mr: 3, ml: 3 }}

						id="free-solo-demo"
						freeSolo
						options={rows.map((option) => option.activity_name)}
						renderInput={(params) => <TextField {...params} label="Search" />}
						onChange={(e) => console.log(e.target.textContent)}
					/>
					<Box sx={{ display: "flex", cursor: 'pointer' }}   >
						<img src="delete.svg" ></img>
						<Typography fontFamily={"Poppins, sans-serif"} fontWeight={500} fontSize={14} p={1} pr={3}>Delete</Typography>
					</Box>
					<Box border={1} mr={2} height={"70%"} borderRadius={1} borderColor={"#987B31"} sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }} onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })} >
						<img src="cloud.svg" style={{ alignSelf: "center", justifySelf: "center", padding: "6px", marginLeft: "20px" }} ></img>
						<Typography fontFamily={"Poppins, sans-serif"} fontWeight={500} fontSize={14} color={"#987B31"} p={1} pl={0} marginRight={2}>Export</Typography>
					</Box>
					<Button

						startIcon={
							<SvgIcon fontSize="small">
								<PlusIcon color="#181F24" />
							</SvgIcon>
						}
						onClick={() => {
							router.push("/add-project");
						}}
						variant="contained"
						sx={{
							":hover": {
								bgcolor: hoverButtonColor,
							},
						}}
					>
						<Typography color={"#181F24"} fontFamily={"Poppins, sans-serif"} fontWeight={400} fontSize={14}>Add Project</Typography>
					</Button>
				</Box>
			</Box>
			
		</GridToolbarContainer>
	);
}


const Page = () => {
	const handleSelection = (e) => {
		const { id } = e;
		console.log(e, " ))))");
	};
	const handleDelete = () => {
		console.log("deleted selected entries")
	}






	const getRowClassName = () => 'super-app-theme--cell';
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Milestones | ConstructMind AI</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
					px: 8,
				}}
			>
				<Container >

					<div
						style={{
							height: '100% !important',
						}}
					>
						<StyledDataGrid
						sx={{width: "1000px"}}
							className="download_this"
							rows={rows}
							columns={columns}
							getRowClassName={getRowClassName}
							initialState={{
								pagination: {
									paginationModel: {
										page: 0,
										pageSize: 10,
									},
								},
							}}
							slots={{ toolbar: CustomToolbar }}
							pendDateSizeOptions={[5, 10]}
							checkboxSelection
							onCellClick={(e) => handleSelection(e)}
						/>
					</div>
				</Container>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
