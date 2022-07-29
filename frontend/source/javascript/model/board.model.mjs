export class BoardModel {
    #boardId;
    #name;

    constructor(id, name){
        this.#boardId = id;
        this.#name = name;   
    }

    getName(){ return this.#name; }

    getId(){ return this.#boardId; }
}