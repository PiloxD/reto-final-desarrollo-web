import { Board } from "../view/components/board.component.mjs";

export class IndexView{
    #mainContainer;

    constructor() {
        this.mainContainer = document.querySelector('#container');
    }

    init(boards) {
        this.clearView();       
        boards.map(board => {
            const name = board.getName();
            const boardId = board.getId();
            //componente board            
            const newBoard = new Board(name,boardId);
            newBoard.showBoard()
        })        
    }

    clearView() {
        this.mainContainer.innerHTML = '';
    }



    
}