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
        const $buttonBoard = document.createElement('button');
        $buttonBoard.addEventListener('click', () => changeView(this.#id));
        $buttonBoard.id = this.#id;
        $buttonBoard.type = 'button';
        $buttonBoard.classList.add('card-board');
        $buttonBoard.addEventListener("dragstart", this.dragStart )

        $boardContainer.append($buttonBoard);

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
