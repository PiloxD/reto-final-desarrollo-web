"use strict";

import { BoardService } from "../model/services/board.service.mjs";
import { IndexView } from "../view/index.view.mjs"

class IndexController {
    #indexView;
    #allBoards;

    constructor() {
        this.#indexView = new IndexView()

    }
    async init() {
        const data = new BoardService()
        this.#allBoards = await data.getAllBoards()
        console.log("All : ")
        console.log("All boards: ", this.#allBoards)
    }
}

export const indexController = new IndexController();
indexController.init()