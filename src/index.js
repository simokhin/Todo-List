import "./reset.css";
import "./styles.css";

import { ToDo, toDoList, addTask } from "./todo.js";

const task1 = new ToDo("Сделай дело - гуляй смело", "20.12.24", "High");
addTask(task1);
dom();
updateDom();

function dom() {
    const addTaskButton = document.querySelector(".add-task-but");
    addTaskButton.addEventListener("click", () => {
        const addTaskForm = document.querySelector(".add-task");
        addTaskForm.setAttribute("style","visibility: visible");
    })

    const submitButton = document.querySelector(".add");
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        const taskNameForm = document.querySelector("#name");
        console.log(taskNameForm);
        const taskDateForm = document.querySelector("#date");
        console.log(taskDateForm);
        const taskPriorityForm = document.querySelector("#priority");
        console.log(taskPriorityForm);
      
        let newTask = new ToDo(taskNameForm.value, taskDateForm.value, taskPriorityForm.value);
        addTask(newTask);
        createNewTask(toDoList);
    })

    const hideButton = document.querySelector(".hide");
    hideButton.addEventListener("click", () => {
        const addTaskForm = document.querySelector(".add-task");
        addTaskForm.setAttribute("style","visibility: hidden");
    })
}

function updateDom(){
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
}

function createNewTask(array){
    let lastArray = array[array.length-1];

    const list = document.querySelector(".todolist");

    const div = document.createElement("div");
    div.classList.add("list-row");
    div.classList.add("back");
    list.appendChild(div);

    const taskName = document.createElement("div");
    taskName.classList.add("name");
    taskName.textContent = lastArray.name;

    const taskDate = document.createElement("div");
    taskDate.classList.add("date");
    taskDate.textContent = lastArray.date;

    const taskPriority = document.createElement("div");
    taskPriority.classList.add("date");
    taskPriority.textContent = lastArray.priority;

    div.append (taskName, taskDate, taskPriority);
}