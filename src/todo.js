export let toDoList = localStorage.getItem("tasks") ?
JSON.parse(localStorage.getItem("tasks")) : [];

export let categories = localStorage.getItem("categories") ?
JSON.parse(localStorage.getItem("categories")) : [];


export class ToDo {
    constructor(name, date, priority, dir) {
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.dir = dir;
    }
}

export function addTask(task, dir) {
    toDoList.push(task);

    localStorage.setItem(`tasks`, JSON.stringify(toDoList));
    localStorage.setItem(`${dir}`, JSON.stringify(+task));
}

