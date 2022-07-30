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
        data.map(item =>{
            const {id, name, deliveryDate} = item;            
            this.#addTask(new TaskModel(id, name, deliveryDate));
        });
        return this.#listTasks;
    }
}