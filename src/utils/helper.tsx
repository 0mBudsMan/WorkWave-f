
import { Task } from "./public-types";
function getRandomValueFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}
const randomColorPallete = ["#8CB9BD", "blue", "#12372A", "#436850", "#FF5733", "#FFD700"];
   
export function initTasks(tasksArray) {
    
    console.log(tasksArray)
    const currentDate = new Date();
    const toreturn: Task[] = [];
     
    for (let i = 0; i < tasksArray.length; i++) {
       
        toreturn.push({
            start: new Date(tasksArray[i].start_date),
            end: new Date(tasksArray[i].end_date),
            name: tasksArray[i].description,
            id: tasksArray[i].id,
            progress: tasksArray[i].progress,
            dependencies: tasksArray[i].parents,
            type: "project",
            hideChildren: true,
            displayOrder: i + 1,
            assignee: tasksArray[i].assignee_name,
            assigner: tasksArray[i].assigner_name,
            styles: {
                progressColor: getRandomValueFromArray(randomColorPallete),
                progressSelectedColor: getRandomValueFromArray(randomColorPallete),
                backgroundColor: getRandomValueFromArray(randomColorPallete)
            },
        })
    }
    



    return toreturn;
}

export function kanbanInit(tasksArray) {
    let toReturn = [];
    
    // {
    //     "Id": "Task 1",
    //     "Title": "Task - 29001",
    //     "Status": "Open",
    //     "Summary": "Analyze the new requirements gathered from the customer.",
    //     "Type": "Story",
    //     "Priority": "Low",
    //     "Tags": "Analyze,Customer",
    //     "Estimate": 3.5,
    //     "Assignee": "Nancy Davloio",
    //     "RankId": 1,
    //     "Color": "#02897B",
    //     "ClassName": "e-story, e-low, e-nancy-davloio"
    // },
    for(let i=0;i<tasksArray.length;i++){
        let tempArray = [];
        let status="";
        switch (tasksArray[i].Status){
            case "COMPLETED":
                status = "Close"
                break;
            case "PENDING":
                status = "Open"
                break;
            case "IN_PROGRESS":
                status = "InProgress"
                break;
            case "IN_REVIEW":
                status = "Review"
                break;
            default:
                status = "InProgress"
        }
        toReturn.push({
            Id: tasksArray[i].id,
            Title: tasksArray[i].Title,
            Status: status,
            Summary: tasksArray[i].Description,
            Type: "Software Engineering Project",
            Priority: "Normal",
            Tags: "IIIT-A, SE",
            Estimate: "3.5",
            Assignee: tasksArray[i].orgName,
            Color: getRandomValueFromArray(randomColorPallete),
            ClassName: ['e-'+tasksArray[i].orgName.replace(/\s/g, ''), 'e-normal']

        })
    }
    let ass = [
        {
            "Id": "Task 2",
            "Title": "Task - 29002",
            "Status": "InProgress",
            "Summary": "Improve application performance",
            "Type": "Improvement",
            "Priority": "Normal",
            "Tags": "Improvement",
            "Estimate": 6,
            "Assignee": "Andrew Fuller",
            "RankId": 1,
            "Color": "#673AB8",
            "ClassName": "e-improvement, e-normal, e-andrew-fuller"
        }
    ]
    return toReturn;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
    const projectTasks = tasks.filter(t => t.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;

    for (let i = 0; i < projectTasks.length; i++) {
        const task = projectTasks[i];
        if (start.getTime() > task.start.getTime()) {
            start = task.start;
        }
        if (end.getTime() < task.end.getTime()) {
            end = task.end;
        }
    }
    return [start, end];
}
