'use strict';
import { TaskModel } from "./task.model.mjs";

export class ListTasks {

    #listTasks;

    constructor() {
        this.#listTasks = new Array();
    }

    #addTask(board) {
        this.#listTasks.push(board);
    }

    getList(data) {
        data.map(item => {
            const { id, name, description, deliveryDate, logForTask, idColumn, idBoard } = item;
            this.#addTask(new TaskModel(id, name, description, deliveryDate, logForTask, idColumn, idBoard));
        });
        return this.#listTasks;
    }
}