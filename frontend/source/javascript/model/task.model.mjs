export class TaskModel {
    #taskdId;
    #name;
    #deliveryDate;
    #idColumn
    #LogForTask

    constructor(id, name, deliveryDate, idColumn, LogForTask) {
        this.#taskdId = id;
        this.#name = name;
        this.#deliveryDate = deliveryDate;
        this.#idColumn = idColumn;
        this.#LogForTask = LogForTask;
    }

    getId() { return this.#taskdId; }

    getName() { return this.#name; }

    getDeliveryDate() { return this.#deliveryDate; }

    getIdColumn() { return this.#idColumn; }

    getLogs() { return this.#LogForTask; }
}