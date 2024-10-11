export let toDoList = [];

export class ToDo {
    constructor(name, date, priority) {
        this.name = name;
        this.date = date;
        this.priority = priority;
    }
}

export function addTask(task) {
    toDoList.push(task);
}
