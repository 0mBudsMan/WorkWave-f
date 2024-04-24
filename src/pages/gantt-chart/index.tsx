import React, { useEffect, useState } from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";
import { Layout as Nested } from "../../layouts/dashboard/gantt-layout"; 
import { getStartEndDateForProject, initTasks } from "../../utils/helper";
import "gantt-task-react/dist/index.css";
import { Button, Switch, Typography, Autocomplete, TextField } from "@mui/material";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {ButtonGroup} from "@mui/material";
import  CircularLoader  from '@/components/CircularLoader';
import axios from "axios";
import {userGetter, tokenGetter} from "../../utils/idgetter"
import { useRouter } from "next/router";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const currentDate = new Date();
const tasks: Task[] = [
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Backend Improvements",
      id: "ProjectSample",
      progress: 25,
      dependencies: ["ProjectSample2"],
      type: "project",
      hideChildren: true,
      displayOrder: 1,
      styles: {
          progressColor: "blue",
          progressSelectedColor: "#8CB9BD",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
      name: "Desktop Development",
      id: "ProjectSample2",
      progress: 60,
      type: "project",
      hideChildren: true,
      displayOrder: 2,
      styles: {
          progressColor: "#12372A",
          progressSelectedColor: "#436850",
          backgroundColor: "#436850",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
      name: "Frontend Updates",
      id: "ProjectSample3",
      progress: 40,
      type: "project",
      hideChildren: true,
      displayOrder: 3,
      styles: {
          progressColor: "#FF5733",
          progressSelectedColor: "#FF8552",
          backgroundColor: "#FF8552",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Security Enhancements",
      id: "ProjectSample4",
      progress: 50,
      type: "project",
      hideChildren: true,
      displayOrder: 4,
      styles: {
          progressColor: "#A61B1B",
          progressSelectedColor: "#FFB6B6",
          backgroundColor: "#FFB6B6",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 11),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
      name: "Mobile App Development",
      id: "ProjectSample5",
      progress: 30,
      type: "project",
      hideChildren: true,
      displayOrder: 5,
      styles: {
          progressColor: "#FFA500",
          progressSelectedColor: "#FFD700",
          backgroundColor: "#FFD700",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      name: "Database Optimization",
      id: "ProjectSample6",
      progress: 70,
      type: "project",
      hideChildren: true,
      displayOrder: 6,
      styles: {
          progressColor: "#4B0082",
          progressSelectedColor: "#7B68EE",
          backgroundColor: "#7B68EE",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 21),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      name: "UI/UX Redesign",
      id: "ProjectSample7",
      progress: 20,
      type: "project",
      hideChildren: true,
      displayOrder: 7,
      styles: {
          progressColor: "#FF00FF",
          progressSelectedColor: "#FF69B4",
          backgroundColor: "#FF69B4",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 26),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 28),
      name: "Documentation Update",
      id: "ProjectSample8",
      progress: 10,
      type: "project",
      hideChildren: true,
      displayOrder: 8,
      styles: {
          progressColor: "#008080",
          progressSelectedColor: "#00CED1",
          backgroundColor: "#00CED1",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
      name: "Testing Phase",
      id: "ProjectSample9",
      progress: 15,
      type: "project",
      hideChildren: true,
      displayOrder: 9,
      styles: {
          progressColor: "#FFD700",
          progressSelectedColor: "#FFFF00",
          backgroundColor: "#FFFF00",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Infrastructure Setup",
      id: "ProjectSample10",
      progress: 20,
      type: "project",
      hideChildren: true,
      displayOrder: 10,
      styles: {
          progressColor: "#4682B4",
          progressSelectedColor: "#87CEFA",
          backgroundColor: "#87CEFA",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 11),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "User Interface Refinement",
      id: "ProjectSample11",
      progress: 25,
      type: "project",
      hideChildren: true,
      displayOrder: 11,
      styles: {
          progressColor: "#9932CC",
          progressSelectedColor: "#BA55D3",
          backgroundColor: "#BA55D3",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
      name: "Backend API Development",
      id: "ProjectSample12",
      progress: 30,
      type: "project",
      hideChildren: true,
      displayOrder: 12,
      styles: {
          progressColor: "#00FF7F",
          progressSelectedColor: "#98FB98",
          backgroundColor: "#98FB98",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 21),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      name: "Bug Fixes",
      id: "ProjectSample13",
      progress: 35,
      type: "project",
      hideChildren: true,
      displayOrder: 13,
      styles: {
          progressColor: "#FF6347",
          progressSelectedColor: "#FFA07A",
          backgroundColor: "#FFA07A",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 26),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 28),
      name: "Performance Optimization",
      id: "ProjectSample14",
      progress: 40,
      type: "project",
      hideChildren: true,
      displayOrder: 14,
      styles: {
          progressColor: "#800000",
          progressSelectedColor: "#8B0000",
          backgroundColor: "#8B0000",
      },
  },
  // New tasks added below
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
      name: "Deployment Planning",
      id: "ProjectSample15",
      progress: 45,
      type: "project",
      hideChildren: true,
      displayOrder: 15,
      styles: {
          progressColor: "#8A2BE2",
          progressSelectedColor: "#9370DB",
          backgroundColor: "#9370DB",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Content Creation",
      id: "ProjectSample16",
      progress: 50,
      type: "project",
      hideChildren: true,
      displayOrder: 16,
      styles: {
          progressColor: "#228B22",
          progressSelectedColor: "#32CD32",
          backgroundColor: "#32CD32",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 11),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Server Configuration",
      id: "ProjectSample17",
      progress: 55,
      type: "project",
      hideChildren: true,
      displayOrder: 17,
      styles: {
          progressColor: "#800080",
          progressSelectedColor: "#BA55D3",
          backgroundColor: "#BA55D3",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
      name: "Data Analysis",
      id: "ProjectSample18",
      progress: 60,
      type: "project",
      hideChildren: true,
      displayOrder: 18,
      styles: {
          progressColor: "#CD5C5C",
          progressSelectedColor: "#DC143C",
          backgroundColor: "#DC143C",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 21),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      name: "Integration Testing",
      id: "ProjectSample19",
      progress: 65,
      type: "project",
      hideChildren: true,
      displayOrder: 19,
      styles: {
          progressColor: "#8B0000",
          progressSelectedColor: "#B22222",
          backgroundColor: "#B22222",
      },
  },
  {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 26),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 28),
      name: "User Acceptance Testing",
      id: "ProjectSample20",
      progress: 70,
      type: "project",
      hideChildren: true,
      displayOrder: 20,
      styles: {
          progressColor: "#006400",
          progressSelectedColor: "#008000",
          backgroundColor: "#008000",
      },
  }
];

// Init
const Page = () => {
  let tempID = userGetter();
  tempID = tempID.id
  console.log(tempID)
  const [pageLoaded, setPageLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [taskks, setTaskks] = useState(tasks);
  const [organisations, setOrganisations] = useState([]);
  const [organisation, setOrganisation] = useState("");
  const [organisationID, setOrganisationID] = useState();
  const [pageLoadedO, setPageLoadedO] = useState(false);
  const [assigner, setAssigner] = useState("");
  const [assignee, setAssignee] = useState("");
  // const [tasks, setTasks] = useState([]);

  const router = useRouter();
  const currentUrl = router.asPath;
  const urlAfterGanttChart = currentUrl.split('/gantt-chart?')[1];

  async function organisationsGetter() {
  
    const token = tokenGetter();
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation/getOrganisations`, {
      headers:{
        'Authorization': 'Bearer '+token
      }
    })
    .then((res)=>{
      console.log(res);
      setOrganisations(res.data.data);
      setPageLoadedO(true)
    })
    .catch((err)=>{console.log(err)})
  }
  async function tasksGetter(id){
    const token = tokenGetter();
    
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/organisation/get/`+id,{
      headers:{
        'Authorization': 'Bearer '+token
      }
    })
    .then((res)=>{
      console.log(res)
      console.log(initTasks(res.data.data));
      setTaskks(initTasks(res.data.data))
      setPageLoaded(true)
    })
  }

  const [varb1, setVarb1]=React.useState("contained")
const [varb2, setVarb2]=React.useState("outlined")
const [varb3, setVarb3]=React.useState("outlined")


const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
const changeView = (newView: ViewMode) => {
  setView(newView);
};

const buttonToggle1 = () => {
 setVarb1("contained"); setVarb2("outlined"); setVarb3("outlined");
 changeView(ViewMode.Day)
}
const buttonToggle2 = () => {
  setVarb2("contained")
  setVarb1("outlined");  setVarb3("outlined");
  changeView(ViewMode.Month)
 }
 const buttonToggle3 = () => {
  setVarb3("contained"); setVarb2("outlined"); setVarb1("outlined");
  changeView(ViewMode.Year)
 }
  
  // const [tasks, setTasks] = React.useState<Task[]>(initTasks([]));
  const [hide, setHide]=React.useState(false);
  let columnWidth = 65;
  

  const handleTaskChange = (task: Task) => {
    /*console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);*/

  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTaskks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTaskks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    setAssignee(task.assignee)
    setAssigner(task.assigner)
    console.log(task)
    console.log("On Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTaskks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };
  

  const searchTasksAndRelatedProjects=(query ) => {
  const queryLowerCase = query.toLowerCase();

  // Filter tasks whose name contains the query
  const filteredTasks = taskks.filter(task => task.name.toLowerCase().includes(queryLowerCase));

  // Find the projects related to the filtered tasks
  const relatedProjectIds = filteredTasks.map((task)=>{
    if(task.project)
    {
        return task.project; 
    }

  });
  const relatedProjects=taskks.filter((task)=>{
    if(relatedProjectIds.includes(task.id)) return task;
  })

  /*const relatedProjects = tasks.filter(task => task.type === "project" && relatedProjectIds.includes(task.id));

  // Merge filtered tasks and related projects
  const searchResults = [...filteredTasks, ...relatedProjects];

  return searchResults;*/
  let temp=[...filteredTasks,...relatedProjects]; var cnt=1;
  let tr1=temp.slice().sort((a,b)=>a.displayOrder-b.displayOrder);
  let tr=tr1.filter((t)=>{
    t.displayOrder=cnt;
    cnt+=1;
    return t;
  })
  console.log(tr)
  
  return tr;
  }

  const filteringFunction=(event,value)=>{
    const query=value;
    console.log(query)
    setTaskks(searchTasksAndRelatedProjects(query))
  }
  const [hidden, setHidden]=useState(true)

  
 if(!urlAfterGanttChart){
    if(!pageLoadedO){
      organisationsGetter();
      return <h1>LOADING</h1>
    }
    else{
      console.log(organisations)
      return(<>
        <InputLabel id="demo-simple-select-label">Organisation</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
     value={organisationID}
    label="Organisation"
    onChange={(e)=>{
      console.log(e)
      setOrganisationID(e.target.value)
      router.push("/gantt-chart?id="+e.target.value)
    }}
  >
    {organisations?.map((item,index)=>{
      return(
      <MenuItem value={item.id}>{item.Name}</MenuItem>
      )
    })}
    
  </Select></>
      )
    }
    
    
  }
  else{
    if(!pageLoaded){
      tasksGetter(organisationID);
      return <h1>LOADINF</h1>
      
    }
    else{
  return (
    <Nested tasks={taskks} display={hidden==false?"block":"none"}>

   <div style={{display: "flex",}} >
    {!hidden && <ArrowBackIosNewIcon onClick={()=>setHidden(!hidden)} style={{padding:"0", margin: "0", marginTop: "40vh", color: "#131311", backgroundColor: "#ffc93c", cursor:"pointer" }}></ArrowBackIosNewIcon>
}
{hidden && <ArrowForwardIosIcon onClick={()=>setHidden(!hidden)} style={{padding:"0", margin: "0", marginTop: "40vh", color: "#131311", backgroundColor: "#ffc93c", cursor:"pointer"  }}></ArrowForwardIosIcon>
}
    <div className="Wrapper" style={{paddingLeft: "2px"}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "85vw",paddingRight: "25px", paddingBottom:"25px" }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        sx={{width: "320px"}}
        options={tasks?.map((option) => option.name)}
        onChange={filteringFunction}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <ButtonGroup  aria-label="Basic button group" sx={{paddingBottom: "25px"}}>
  <Button variant={varb1} onClick={buttonToggle1}  className="b1">Day</Button>
  <Button variant={varb2} onClick={buttonToggle2} className="b2">Month</Button>
  <Button variant={varb3} onClick={buttonToggle3} className="b2">Year</Button>
  
</ButtonGroup>
    
        
      </div>
      
     <Typography>Assigner: {assigner}</Typography>
     <Typography>Assignee: {assignee}</Typography>
      <Gantt
        tasks={taskks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={hide? "155px":"" }
        columnWidth={columnWidth}
        barCornerRadius={15}
      />
      
    </div>
    </div>
    </Nested>
  );}}
};
Page.getLayout = (page) =>  <DashboardLayout isMinimised={true}>{page}</DashboardLayout>;

export default Page;
