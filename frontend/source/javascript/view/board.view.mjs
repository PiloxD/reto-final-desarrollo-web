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

    async init(board) {
        this.clearView();
        const newBoard = new IntoBoard(board);
        newBoard.showBoard();

        const tasks = new TaskController()
        this.#tasksInColum = await tasks.getTasks(board.getId())



        this.#tasksInColum.map(task => {
            if (task.getIdColumn() === 1) {
                const name = task.getName();
                const description = task.getDescription();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const logForTask = task.getLogForTask();
                const newTask = new Task(taskdId, name, description, deliveryDate, logForTask);
                newTask.showCardTask("#column1", this.changeViewInBoard, this.#tasksInColum);

            } else if (task.getIdColumn() === 2) {
                const name = task.getName();
                const description = task.getDescription();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const logForTask = task.getLogForTask();
                const newTask = new Task(taskdId, name, description, deliveryDate, logForTask);
                newTask.showCardTask("#column2", this.changeViewInBoard, this.#tasksInColum);
            }
            else if (task.getIdColumn() === 3) {
                const name = task.getName();
                const description = task.getDescription();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const logForTask = task.getLogForTask();
                const newTask = new Task(taskdId, name, description, deliveryDate, logForTask);
                newTask.showCardTask("#column3", this.changeViewInBoard, this.#tasksInColum);
            }
        })
    }

    clearView() {
        this.#mainContainer.innerHTML = '';
    }

    changeViewInBoard(taskId, taskList) {
        const task = new TaskController().taskFilter(taskList, taskId)
        const detail = new TaskDetail(task)
        const modal = new Modal()
        modal.showModal(detail.get())


    }
}