
import { Task } from "./public-types";

export function initTasks(tasksArray) {
    console.log(tasksArray)
    const currentDate = new Date();
    const toreturn: Task[] = [];
    const randomColorPallete = ["#8CB9BD", "blue", "#12372A", "#436850", "#FF5733", "#FFD700"];
    function getRandomValueFromArray(array) {
        const randomIndex = Math.floor(Math.random() * array.length);

        return array[randomIndex];
    }
    for (let i = 0; i < tasksArray.length; i++) {
        toreturn.push({
            start: new Date(tasksArray[i].StartDate),
            end: new Date(tasksArray[i].EndDate),
            name: tasksArray[i].Description,
            id: tasksArray[i].id,
            progress: 100,
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
