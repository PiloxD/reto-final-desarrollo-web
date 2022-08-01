/**
 * Clase para el modelo de las tareas
 */
export class TaskModel {
    #taskdId;
    #name;
    #description
    #deliveryDate;
    #logForTask
    #idColumn
    #idBoard;

    constructor(id, name, description, deliveryDate, logForTask, idColumn, idBoard) {
        this.#taskdId = id;
        this.#name = name;
        this.#description = description;
        this.#deliveryDate = deliveryDate;
        this.#logForTask = logForTask;
        this.#idColumn = idColumn;
        this.#idBoard = idBoard;
    }

    getId() { return this.#taskdId; }
    
    getIdBoard() { return this.#idBoard; }

    getName() { return this.#name; }

    getDescription() { return this.#description; }

    getDeliveryDate() { return this.#deliveryDate; }

    getLogForTask() { return this.#logForTask; }

    getIdColumn() { return this.#idColumn; }

}