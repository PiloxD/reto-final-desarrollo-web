export class Task {
    #taskdId;
    #name;
    #deliveryDate;

    constructor(id, name,  deliveryDate) {
        this.#taskdId = id;
        this.#name = name;
        this.#deliveryDate = deliveryDate;
    }

/**
 *  Este método sirve para mostrar las tarjetas de las tareas
 * @param {*} column Columna en la que se posicionará la tarea
 * @param {*} changeViewInBoard Método que abre los detalles de la tarea
 * @param {*} tasksInColum Lista de las tareas en columnas
 */
    showCardTask(column,changeViewInBoard, tasksInColum) {
        const $taskContainer = document.querySelector(column);
        const $buttonTask = document.createElement('button');
        $buttonTask.addEventListener('click', () => changeViewInBoard(this.#taskdId, tasksInColum));
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
/**
 * Este método sirve para capturar el id de una tarea y mandarlo al LocalStorage
 * @param {*} e evento 
 */
    dragStart(e) {
        localStorage.setItem('id-task', JSON.stringify(e.target.id));
    }

}
