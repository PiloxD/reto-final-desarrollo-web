import { BoardView } from "../view/board.view.mjs";
import { BoardService } from "../model/services/board.service.mjs";
import { BoardModel } from "../model/board.model.mjs";

export class BoardController{
    #boarView;
    #board;

    constructor() {
        this.#boarView = new BoardView();
    }

    async getBoard(id) {
        console.log(id);
        const boardService = new BoardService();
        const response = await boardService.getBoardById(id);
        const data = response.data;  
        console.log(data);      
        const {name} = data;
        const newBoard = new BoardModel(id, name);                
        this.#boarView.init(newBoard);                  
    }
}