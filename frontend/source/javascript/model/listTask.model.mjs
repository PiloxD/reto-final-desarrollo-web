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
    /**
     *  Este método sirve para recorrer las tareas e instanciarlas en una lista de ellas
     * @param {*} data 
     * @returns 
     */
    getList(data) {
        data.map(item => {
            const { id, name, description, deliveryDate, logForTask, idColumn } = item;
            this.#addTask(new TaskModel(id, name, description, deliveryDate, logForTask, idColumn));
        });
        return this.#listTasks;
    }
}