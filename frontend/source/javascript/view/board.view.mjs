import { IntoBoard } from "./components/intoBoard.component.mjs";
import { TaskController } from '../controller/task.controller.mjs'
import { Task } from "./components/task.component.mjs";
import { DescriptionTask } from "./components/details.component.mjs";


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
                const idBoard = task.getId();                
                const newTask = new Task(taskdId, name, deliveryDate, idBoard);
                newTask.showCardTask("#column1", this.changeViewInBoard, this.#tasksInColum);

            } else if (task.getIdColumn() === 2) {
                const name = task.getName();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const idBoard = task.getId();                 
                const newTask = new Task(taskdId, name, deliveryDate, idBoard);
                newTask.showCardTask("#column2", this.changeViewInBoard, this.#tasksInColum);
            }
            else if (task.getIdColumn() === 3) {
                const name = task.getName();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const idBoard = task.getId();                 
                const newTask = new Task(taskdId, name, deliveryDate, idBoard);
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
        const task = new TaskController().taskFilter(taskList, taskId);
        const descriptionTask = new DescriptionTask(task);
        const idBoard = task.getIdBoard();        
        const domDescription = descriptionTask.get();
        const logs = task.getLogForTask();
        Swal.fire({
            html:
            domDescription,
            showCloseButton:true,
            showConfirmButton: false,
        })

        const taskController = new TaskController();

        const $updateButton = document.querySelector("#update-task");
        $updateButton.addEventListener('click', () => taskController.showForm(taskId, "update", idBoard));

        const $deleteButton = document.querySelector("#delete-task");
        $deleteButton.addEventListener('click', () => taskController.deleteTask(taskId, idBoard));
        
        const $tableBody = document.querySelector("#details-logs");
        logs.map((log) => {
            $tableBody.innerHTML += `
            <tr>
                <td>${log.idClmPrevious}</td>
                <td>${log.idClmCurrent}</td>
                <td>${log.createdAt}</td>
            </tr>
            `
        });
    }
}