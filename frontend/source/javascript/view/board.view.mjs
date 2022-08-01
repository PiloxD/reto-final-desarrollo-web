import { IntoBoard } from "./components/intoBoard.component.mjs";
import { TaskController } from '../controller/task.controller.mjs'
import { Task } from "./components/task.component.mjs";
import { Modal } from "./components/modal.component.mjs";
import { TaskDetail } from "./components/taskDetail.component.mjs";


export class BoardView {
    #mainContainer;
    #tasksInColum
    constructor() {
        this.#mainContainer = document.querySelector('#container');
    }
    /**
     * Método para inicializar la vista del tablero seleccionado
     * @param {*} board 
     */
    async init(board) {
        this.clearView();
        const newBoard = new IntoBoard(board);
        newBoard.showBoard();

        const tasks = new TaskController();
        this.#tasksInColum = await tasks.getTasks(board.getId());

        this.#tasksInColum.map(task => {
            if (task.getIdColumn() === 1) {
                const name = task.getName();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const newTask = new Task(taskdId, name, deliveryDate);
                newTask.showCardTask("#column1", this.changeViewInBoard, this.#tasksInColum);

            } else if (task.getIdColumn() === 2) {
                const name = task.getName();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const newTask = new Task(taskdId, name, deliveryDate);
                newTask.showCardTask("#column2", this.changeViewInBoard, this.#tasksInColum);
            }
            else if (task.getIdColumn() === 3) {
                const name = task.getName();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const newTask = new Task(taskdId, name, deliveryDate);
                newTask.showCardTask("#column3", this.changeViewInBoard, this.#tasksInColum);
            }
        })
    }
    /**
     * Método para limpiar la vista
     */
    clearView() {
        this.#mainContainer.innerHTML = '';
    }
    /**
     * Método para traer los detalles de la tarea seleccionada
     * @param {*} taskId ID de la tarea seleccionada
     * @param {*} taskList  Lista de todas las tareas del tablero
     */
    changeViewInBoard(taskId, taskList) {
        const task = new TaskController().taskFilter(taskList, taskId)
        const detail = new TaskDetail(task)
        const modal = new Modal()
        modal.showModal(detail.get())

    }
}