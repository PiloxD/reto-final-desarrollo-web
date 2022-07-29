"use strict";

import { BoardService } from "../model/services/board.service.mjs";
import { IndexView } from "../view/index.view.mjs"
import { ListBoard } from "../model/listBoard.mjs";

class IndexController {
    #indexView;
    #allBoards;

    constructor() {
        this.#indexView = new IndexView();
    }

    async init() {
        const listBoard = new ListBoard();
        const boardService = new BoardService();    
        const response = await boardService.getAllBoards();
        const data = response.data;     
        this.#allBoards = listBoard.getList(data);        
        this.#indexView.init(this.#allBoards);                
    }
}

export const index = new IndexController();
index.init();