export class TaskModel {
    #taskdId;
    #name;
    #deliveryDate;
    #idColumn

    constructor(id, name, deliveryDate, idColumn) {
        this.#taskdId = id;
        this.#name = name;
        this.#deliveryDate = deliveryDate;
        this.#idColumn = idColumn;
    }

    getId() { return this.#taskdId; }

    getName() { return this.#name; }

    getDeliveryDate() { return this.#deliveryDate; }

    getIdColumn() { return this.#idColumn; }
}