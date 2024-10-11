import "./reset.css";
import "./styles.css";

import { ToDo, toDoList, addTask } from "./todo.js";

const task1 = new ToDo("Сделай дело - гуляй смело", "20.12.24", "High");
addTask(task1);
dom();

function dom() {
    const list = document.querySelector(".todolist");

    toDoList.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("list-row");
        div.classList.add("back");
        list.appendChild(div);
    
        const taskName = document.createElement("div");
        taskName.classList.add("name");
        taskName.textContent = task.name;
    
        const taskDate = document.createElement("div");
        taskDate.classList.add("date");
        taskDate.textContent = task.date;
    
        const taskPriority = document.createElement("div");
        taskPriority.classList.add("date");
        taskPriority.textContent = task.priority;
    
        div.append (taskName, taskDate, taskPriority);
    })

    const addTaskButton = document.querySelector(".add-task-but");
    addTaskButton.addEventListener("click", () => {
        const addTaskForm = document.querySelector(".add-task");
        addTaskForm.setAttribute("style","visibility: visible");
    })

    const hideButton = document.querySelector(".hide");
    hideButton.addEventListener("click", () => {
        const addTaskForm = document.querySelector(".add-task");
        addTaskForm.setAttribute("style","visibility: hidden");
    })
}
