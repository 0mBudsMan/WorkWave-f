import React, { useState } from "react";
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
// Init
const Page = () => {
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
  
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
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
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };
  

  const searchTasksAndRelatedProjects=(query ) => {
  const queryLowerCase = query.toLowerCase();

  // Filter tasks whose name contains the query
  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(queryLowerCase));

  // Find the projects related to the filtered tasks
  const relatedProjectIds = filteredTasks.map((task)=>{
    if(task.project)
    {
        return task.project; 
    }

  });
  const relatedProjects=tasks.filter((task)=>{
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
    setTasks(searchTasksAndRelatedProjects(query))
  }
  const [hidden, setHidden]=useState(true)


  return (
    <Nested display={hidden==false?"block":"none"}>

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
        options={tasks.map((option) => option.name)}
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
      
     
      <Gantt
        tasks={tasks}
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
  );
};
Page.getLayout = (page) =>  <DashboardLayout isMinimised={true}>{page}</DashboardLayout>;

export default Page;
