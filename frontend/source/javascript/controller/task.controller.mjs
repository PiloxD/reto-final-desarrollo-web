import { TaskService } from "../model/services/task.service.mjs";
import { ListTasks } from "../model/listTask.model.mjs";
import { Modal } from "../view/components/modal.component.mjs";

export class TaskController {

    async getTasks(idBoard) {
        const taskService = new TaskService();
        const response = await taskService.getAllTaskByBoardId(idBoard);
        const data = response.data;
        const listTask = new ListTasks();
        const tasksInColum = listTask.getList(data);
        return tasksInColum

        // const {name} = data;
        // const newBoard = new BoardModel(id, name);                
        // this.#boarView.init(newBoard);                  
    }

    filterColumn() {
    }

    moveTask(idColumn, idTaks){
        const taskService = new TaskService();
        taskService.getAndMoveTask(idColumn, idTaks);
    }

    createTask(idBoard){
        const modal = new Modal();
        modal.showModal();
        //const taskService = new TaskService();
        //taskService.createTask(idBoard);
    }

    showDetails(task){
        
    }
}