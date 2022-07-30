export class IntoBoard{
    #board

    constructor(board) {
        this.board = board; 
    }

    showBoard(){
        const $mainContainer = document.querySelector('#container');
        $mainContainer.innerHTML = `
            <div class="board">${this.board.getName()}</div>
            <div class="column-container">
                <div class="column" id="column1">
                    <h3>Todo</h3>
                </div>
                <div class="column" id="column2">
                    <h3>In Process</h3>
                </div>
                <div class="column" id="column3">
                    <h3>Done</h3>
                </div>            
            </div>
        `;
    }
}