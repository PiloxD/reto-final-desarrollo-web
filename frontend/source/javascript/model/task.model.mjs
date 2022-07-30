export class TaskModel {
    #taskdId;
    #name;
    #deliveryDate;

    constructor(id, name, deliveryDate){
        this.#taskdId = id;
        this.#name = name; 
        this.#deliveryDate = deliveryDate;  
    }

    getId(){ return this.#taskdId; }
    
    getName(){ return this.#name; }
    
    getDeliveryDate(){ return this.#deliveryDate; }
}