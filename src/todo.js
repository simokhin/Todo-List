export let toDoList = localStorage.getItem("tasks") ?
JSON.parse(localStorage.getItem("tasks")) : [];

export class ToDo {
    constructor(name, date, priority) {
        this.name = name;
        this.date = date;
        this.priority = priority;
    }
}

export function addTask(task) {
    toDoList.push(task);
    localStorage.setItem(`tasks`, JSON.stringify(toDoList));
}

