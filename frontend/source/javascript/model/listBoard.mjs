'use strict';
import { BoardModel } from "./board.model.mjs";
export class ListBoard {
    #listBoards;

    constructor() {
        this.#listBoards = new Array();
    }

    #addBoard(board) {
        this.#listBoards.push(board);
    }

    getList(data) {
        data.map(item =>{
            const {id, name} = item;            
            this.#addBoard(new BoardModel(id, name));
        });
        return this.#listBoards;
    }
}