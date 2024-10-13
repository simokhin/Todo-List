import "./reset.css";
import "./styles.css";

import { ToDo, toDoList, addTask, categories } from "./todo.js";

let id = 0; // Для добавления id категориям

updateDom();
eventListeners();
completeTask();

function eventListeners() {
	const addTaskButton = document.querySelector(".add-task-but"); // Кнопка для появления формы
	addTaskButton.addEventListener("click", () => {
		const addTaskForm = document.querySelector(".add-task");
		addTaskForm.setAttribute("style", "visibility: visible");
	});

	const submitButton = document.querySelector(".add");
	submitButton.addEventListener("click", (event) => {
		const taskNameForm = document.querySelector("#name");
		const taskDateForm = document.querySelector("#date");
		const taskPriorityForm = document.querySelector("#priority");
        const dirName = document.querySelector("#categories");

		if (taskNameForm.value === "") {
			return;
		}

		event.preventDefault();

		let newTask = new ToDo(
			taskNameForm.value,
			taskDateForm.value,
			taskPriorityForm.value,
            dirName.value
		);

		addTask(newTask, dirName);
		location.reload(); // Временное решение
		completeTask();
	});

	const hideButton = document.querySelector(".hide");
	hideButton.addEventListener("click", () => {
		const addTaskForm = document.querySelector(".add-task");
		addTaskForm.setAttribute("style", "visibility: hidden");
	});

    let id = 0;

    const addDirBut = document.querySelector(".add-project"); // ДОБАВИТЬ КАТЕГОРИЮ
    addDirBut.addEventListener("click", (event) => {
        const categoryName = prompt("Category name: ");

        if (categoryName === "" || categoryName === null){
            return;
        }

        categories.push(categoryName);
        localStorage.setItem(`categories`, JSON.stringify(categories));
        localStorage.setItem(`${categoryName}`, "");

        location.reload(); // Временное решение
    })

    const categoriesDirs = document.querySelectorAll(".category");
    console.log(categoriesDirs);

    categoriesDirs.forEach((category) => {
        category.addEventListener("click", (event) => {
            toDoList.forEach((task) => {
                if (task.dir === category.id){
                    const allRows =  document.querySelectorAll(".list-row");
                    allRows.forEach((row) => {
                        row.remove();
                    })

                    addDoInDom(task);
                }
            })
        })
    })
}

function updateDom() {
	

    categories.forEach((category) => { // ОТОБРАЖЕНИЕ КАТЕГОРИЙ
        console.log(categories);
        const ul = document.querySelector("ul");
        const li = document.createElement("li");
        ul.appendChild(li);
        
        const a = document.createElement("a");
        //a.setAttribute("id", `${id}`);
        a.setAttribute("id", `${category}`)
        a.textContent = category;
        a.classList.add("category");
        //id += 1;
        li.appendChild(a);

        const categoriesSelect = document.querySelector("#categories");
        const newCat = document.createElement("option");
        newCat.textContent = category;
        newCat.setAttribute("value", `${category}`);
        categoriesSelect.appendChild(newCat);
    })

	toDoList.forEach((task) => { // ОТОБРАЖЕНИЕ ВСЕХ ДЕЛ
        addDoInDom(task);
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

function addDoInDom(task){
    const list = document.querySelector(".todolist");
    const div = document.createElement("div");
    div.classList.add("list-row");
    div.classList.add("back");
    div.setAttribute("id", `${task.dir}`);
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
    status.setAttribute("id", `${task.dir}`);

    div.append(taskName, taskDate, taskPriority, status);
}