
import { Task } from "./public-types";
function getRandomValueFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}
const randomColorPallete = ["#8CB9BD", "blue", "#12372A", "#436850", "#FF5733", "#FFD700"];
   
export function initTasks(tasksArray) {
    const currentDate = new Date();
    const toreturn: Task[] = [];
     
    for (let i = 0; i < tasksArray.length; i++) {
        toreturn.push({
            start: new Date(tasksArray[i].StartDate),
            end: new Date(tasksArray[i].EndDate),
            name: tasksArray[i].Description,
            id: tasksArray[i].id,
            progress: tasksArray[i].project,
            dependencies: [],
            type: "project",
            hideChildren: true,
            displayOrder: i + 1,
            styles: {
                progressColor: getRandomValueFromArray(randomColorPallete),
                progressSelectedColor: getRandomValueFromArray(randomColorPallete),
            },
        })
    }
    



    return toreturn;
}

export function kanbanInit(tasksArray, name) {
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
        toReturn.push({
            Id: tasksArray[i].id,
            Title: tasksArray[i].Title,
            Status: "InProgress",
            Summary: tasksArray[i].Description,
            Type: "Software Engineering Project",
            Priority: "Normal",
            Tags: "IIIT-A, SE",
            Estimate: "3.5",
            Assignee: name,
            Color: getRandomValueFromArray(randomColorPallete),
            ClassName: ['e-'+name, 'e-normal']

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
