import "./reset.css";
import "./styles.css";

import { ToDo, toDoList, addTask, saveData } from "./todo.js";

dom();
updateDom();
completeTask();

const storedList = JSON.parse(localStorage.getItem(`task 0`));

function dom() {
	const addTaskButton = document.querySelector(".add-task-but");
	addTaskButton.addEventListener("click", () => {
		const addTaskForm = document.querySelector(".add-task");
		addTaskForm.setAttribute("style", "visibility: visible");
	});

	const submitButton = document.querySelector(".add");
	submitButton.addEventListener("click", (event) => {
		const taskNameForm = document.querySelector("#name");
		const taskDateForm = document.querySelector("#date");
		const taskPriorityForm = document.querySelector("#priority");

		if (taskNameForm.value === "") {
			return;
		}

		event.preventDefault();
		let newTask = new ToDo(
			taskNameForm.value,
			taskDateForm.value,
			taskPriorityForm.value
		);

		addTask(newTask);
		location.reload(); // Временное решение
		completeTask();
	});

	const hideButton = document.querySelector(".hide");
	hideButton.addEventListener("click", () => {
		const addTaskForm = document.querySelector(".add-task");
		addTaskForm.setAttribute("style", "visibility: hidden");
	});
}

function updateDom() {
	const list = document.querySelector(".todolist");


	toDoList.forEach((task) => {
		const div = document.createElement("div");
		div.classList.add("list-row");
		div.classList.add("back");
		div.setAttribute("id", `${task.id}`);
		list.appendChild(div);

		const taskName = document.createElement("div");
		taskName.classList.add("name");
        taskName.textContent = task.name;

		const taskDate = document.createElement("div");
		taskDate.classList.add("date");
		taskDate.textContent = task.date;

		const taskPriority = document.createElement("div");
		taskPriority.classList.add("priority");
		taskPriority.textContent = task.priority;
		priorityColor(task, taskPriority);

		const status = document.createElement("div");
		status.classList.add("status");
		status.classList.add("check");
		status.setAttribute("id", `${task.id}`);

		div.append(taskName, taskDate, taskPriority, status);
	});
}

function priorityColor(task, dom) {
	if (task.priority === "High") {
		dom.style.color = "Red";
	} else if (task.priority === "Medium") {
		dom.style.color = "Orange";
	} else if (task.priority === "Low") {
		dom.style.color = "Green";
	}
}

function completeTask() {
	const check = document.querySelectorAll(".check");
	check.forEach((element, id) => {
		element.addEventListener("click", (event) => {
            toDoList.splice(id, 1);
            localStorage.setItem(`tasks`, JSON.stringify(toDoList));
            location.reload();
		});
	});
}
