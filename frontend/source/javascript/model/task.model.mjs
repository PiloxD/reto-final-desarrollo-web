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

    constructor(id, name, description, deliveryDate, logForTask, idColumn) {
        this.#taskdId = id;
        this.#name = name;
        this.#description = description;
        this.#deliveryDate = deliveryDate;
        this.#logForTask = logForTask;
        this.#idColumn = idColumn;
    }

    getId() { return this.#taskdId; }

    getName() { return this.#name; }

    getDescription() { return this.#description; }

    getDeliveryDate() { return this.#deliveryDate; }

    getLogForTask() { return this.#logForTask; }

    getIdColumn() { return this.#idColumn; }

}