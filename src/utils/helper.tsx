import { Task } from "./public-types";

export function initTasks() {
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

  
  
  
  return tasks;
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
