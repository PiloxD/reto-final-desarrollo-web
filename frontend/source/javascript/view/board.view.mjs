import { Board } from "../view/components/board.component.mjs";
import { IntoBoard } from "./components/intoBoard.component.mjs";

export class BoardView{
    #mainContainer;

    constructor() {
        this.#mainContainer = document.querySelector('#container');
    }
    
    init(board) {
        this.clearView(); 
        const newBoard = new IntoBoard(board);
        newBoard.showBoard();
    }

    clearView() {
        this.#mainContainer.innerHTML = '';
    }
    
}