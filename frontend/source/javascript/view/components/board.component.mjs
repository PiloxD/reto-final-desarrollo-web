export class Board {
    #name;
    #id;
    constructor(name, id){
        this.#name = name;
        this.#id = id
    }

    // goToBoard(){  
    //     console.log(this.#id);        
    // }

    showCardBoard( changeView ) {        
        const $boardContainer = document.querySelector('#board-container');
        const $buttonBoard = document.createElement('button');
        $buttonBoard.addEventListener('click', () => changeView(this.#id));
        $buttonBoard.id = this.#id;
        $buttonBoard.type = 'button';
        $buttonBoard.classList.add('card-board');

        $boardContainer.append($buttonBoard);

        $buttonBoard.innerHTML = `
            <div class="indicator"></div>
            <div class="card-body">
                <h5 class="card-title">${this.#name}</h5>
            </div>
        `
    }

}
