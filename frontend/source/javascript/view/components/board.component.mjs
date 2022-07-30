import { BoardController } from "../../controller/board.controller.mjs";
export class Board {
    #name;
    #id;
    constructor(name, id) {
        this.#name = name;
        this.#id = id
    }


    showCardBoard(changeView) {
        const $boardContainer = document.querySelector('#board-container');
        Sortable.create($boardContainer);

        const $cardBoardContainer = document.createElement('div');
        $cardBoardContainer.classList.add('board-container');
        $cardBoardContainer.id = this.#id;
        $cardBoardContainer.addEventListener("dragstart", this.dragStart );
        
        const $buttonBoard = document.createElement('button');
        $buttonBoard.addEventListener('click', () => changeView(this.#id));
        //$buttonBoard.id = this.#id;
        $buttonBoard.type = 'button';
        $buttonBoard.classList.add('card-board');
        

        const boardController = new BoardController();
        const $buttonEdit = document.createElement('button');
        $buttonEdit.classList.add('button-edit');
        $buttonEdit.id = "edit-board";
        $buttonEdit.type = 'button';        
        $buttonEdit.addEventListener('click', () => {
            boardController.captureInfoBoard(this.#id, "update")
        });

        const $iconEdit = document.createElement('i');
        $iconEdit.classList.add('bi', 'bi-pencil-fill');
        $buttonEdit.append($iconEdit);

        $cardBoardContainer.append($buttonBoard,$buttonEdit);
        $boardContainer.append($cardBoardContainer);

        $buttonBoard.innerHTML = `
            <div class="indicator"></div>
            <div class="card-body">
                <h5 class="card-title">${this.#name}</h5>
            </div>            
        `
        
    }

    dragStart(e) {
        localStorage.setItem('id-board', JSON.stringify(e.target.id));
    }

}
