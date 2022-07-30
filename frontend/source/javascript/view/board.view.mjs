import { Board } from "../view/components/board.component.mjs";
import { IntoBoard } from "./components/intoBoard.component.mjs";
import { TaskController } from '../controller/task.controller.mjs'
export class BoardView{
    #mainContainer;

    constructor() {
        this.#mainContainer = document.querySelector('#container');
    }
    
    init(board) {
        this.clearView(); 
        const newBoard = new IntoBoard(board);
        newBoard.showBoard();
        
        const tasks = new TaskController()
        tasks.getTasks(board.getId())

    }

    clearView() {
        this.#mainContainer.innerHTML = '';
    }
    
}