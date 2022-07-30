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
        const boardService = new BoardService();
        const response = await boardService.getBoardById(id);
        const data = response.data;  
        console.log(data);      
        const {name} = data;
        const newBoard = new BoardModel(id, name);                
        this.#boarView.init(newBoard);                  
    }

    deleteBoard() {
        const id = localStorage.getItem("id-board");
        const boardToDelete = JSON.parse(id);
        const boardService = new BoardService();
        boardService.deleteBoardById(boardToDelete);
    }

    createBoard() {
        boardService.createBoard(boardToDelete);
    }
}