import { BoardController } from "../controller/board.controller.mjs";
import { Board } from "../view/components/board.component.mjs";
import { Navbar } from "./components/navbar.component.mjs";
import { ActionsBoard } from "./components/actionsBoard.component.mjs";

export class IndexView {
    #mainContainer;
    #boardController;
    constructor() {
        this.#mainContainer = document.querySelector('#container');
        this.#boardController =  new BoardController();
    }

    init(boards) {
        this.#clearView();
        this.#createTemplate();
        boards.map(board => {
            const name = board.getName();
            const boardId = board.getId();
            const newBoard = new Board(name, boardId);
            newBoard.showCardBoard(this.changeView);
        });
                  
    }

    #clearView() {
        this.#mainContainer.innerHTML = '';
    }
    
    changeView(idBoard){ 
        const boardController = new BoardController();
        boardController.getBoard(idBoard)  
    }

    #createTemplate() {
        const navbar = new Navbar();
        const $nav = navbar.get();
        const $main = document.createElement('main');

        const $cardsBoardContainer = document.createElement('div');
        $cardsBoardContainer.classList.add('card-board-container');
        $cardsBoardContainer.id = "board-container";

        const $actiosBoards = document.createElement('div');
        $actiosBoards.classList.add('actios-boards-buttons');
        $actiosBoards.id = "board-buttons";

        const $title = document.createElement('h2');
        $title.innerHTML = "TUS TABLEROS";
        $title.classList.add('title-container');

        const $infoContainer = document.createElement('div');
        $infoContainer.classList.add('info-container');
        $infoContainer.append($cardsBoardContainer, $actiosBoards);        

        $main.append($title, $infoContainer);
        this.#mainContainer.append($nav, $main);

        const actionsButtons = new ActionsBoard();
    }

    dragable(){
        const $list = document.querySelector("#board-container");
        //Sortable.create($list);
    }
}

