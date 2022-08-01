export class BoardModel {
    #boardId;
    #name;

    constructor(id, name) {
        this.#boardId = id;
        this.#name = name;
    }
    /**
     * Método getter para traer el nombre del tablero
     * @returns 
     */

    getName() { return this.#name; }
    /**
     * Método getter para traer el ID del tablero
     * @returns 
     */
    getId() { return this.#boardId; }
}