export class Task {
    #taskdId;
    #name;
    #deliveryDate;

    constructor(id, name, deliveryDate) {
        this.#taskdId = id;
        this.#name = name;
        this.#deliveryDate = deliveryDate;
    }


    showCardTask(column,changeViewInBoard) {
        const $taskContainer = document.querySelector(column);
        const $buttonTask = document.createElement('button');
        $buttonTask.addEventListener('click', () => changeViewInBoard(this.#taskdId));
        $buttonTask.id = this.#taskdId;
        $buttonTask.type = 'button';
        $buttonTask.classList.add('card-task');

        $taskContainer.append($buttonTask);

        $buttonTask.innerHTML = `
            <div class="indicator"></div>
            <div class="card-body">
                <h5 class="card-title">${this.#name}</h5>
            </div>
            `
    }

}
