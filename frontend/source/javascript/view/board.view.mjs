import { IntoBoard } from "./components/intoBoard.component.mjs";
import { TaskController } from '../controller/task.controller.mjs'
import { Task } from "./components/task.component.mjs";


export class BoardView {
    #mainContainer;

    constructor() {
        this.#mainContainer = document.querySelector('#container');
    }

    async init(board) {
        this.clearView();
        const newBoard = new IntoBoard(board);
        newBoard.showBoard();
        
        const tasks = new TaskController()
        const tasksInColum = await tasks.getTasks(board.getId())
       //console.log(tasksInColum)

        tasksInColum.map(task => {
            if (task.getIdColumn() === 1) {
                const name = task.getName();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const newTask = new Task(taskdId, name, deliveryDate);
                newTask.showCardTask("#column1", this.changeViewInBoard);

            } else if (task.getIdColumn() === 2) {
                const name = task.getName();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const newTask = new Task(taskdId, name, deliveryDate);
                newTask.showCardTask("#column2", this.changeViewInBoard);
            }
            else if (task.getIdColumn() === 3) {
                const name = task.getName();
                const taskdId = task.getId();
                const deliveryDate = task.getDeliveryDate();
                const newTask = new Task(taskdId, name, deliveryDate);
                newTask.showCardTask("#column3", this.changeViewInBoard);
            }

        })

    }

    clearView() {
        this.#mainContainer.innerHTML = '';
    }

    changeViewInBoard(taskdId) {
        console.log(taskdId);
        const taskController = new TaskController();
        taskController.showDetails(taskdId);
        
    }

}