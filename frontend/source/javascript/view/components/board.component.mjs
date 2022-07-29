export class Board {
    #name;
    #id;
    constructor(name, id){
        this.#name = name;
        this.#id = id
    }

    showBoard = () => {
        const $mainContainer = document.querySelector('#container');
        $mainContainer.innerHTML += 
        `
            <button id=${this.#id} type="button" class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${this.#name}</h5>
                </div>
            </button>
        
        `
    };
}
