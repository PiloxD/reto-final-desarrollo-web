export class Task {
    #taskdId;
    #name;
    #deliveryDate;
    #idColumn;

    constructor(id, name, deliveryDate, idColumn) {
        this.#taskdId = id;
        this.#name = name;
        this.#deliveryDate = deliveryDate;
        this.#idColumn = idColumn;
    }


    showCardTask(column,changeViewInBoard) {
        const $taskContainer = document.querySelector(column);
        const $buttonTask = document.createElement('button');
        $buttonTask.addEventListener('click', () => changeViewInBoard(this.#taskdId));
        $buttonTask.id = this.#taskdId;
        $buttonTask.type = 'button';
        $buttonTask.classList.add('card-task');
        $buttonTask.addEventListener("dragstart", this.dragStart );

        $taskContainer.append($buttonTask);

        $buttonTask.innerHTML = `
            <div class="indicator"></div>
            <div class="card-body">
                <h5 class="card-title">${this.#name}</h5>
            </div>            
        `
        if (this.#deliveryDate !== "" && this.#deliveryDate !== null) {
            $buttonTask.innerHTML += `
                <div class="delivery-date">Vence el: ${this.#deliveryDate}</div>
            `
        }
    }

    dragStart(e) {
        localStorage.setItem('id-task', JSON.stringify(e.target.id));
    }

}
