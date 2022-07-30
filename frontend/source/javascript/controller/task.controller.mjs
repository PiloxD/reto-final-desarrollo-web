import { TaskService } from "../model/services/task.service.mjs";
import { ListTasks } from "../model/listTask.model.mjs";

export class TaskController{
    

    async getTasks(idBoard) {
        const taskService = new TaskService();
        const response = await taskService.getAllTaskByBoardId(idBoard);
        const data = response.data; 
        console.log("data: ", data)
        const listTask = new ListTasks();
        listTask.getList(data);

        // const {name} = data;
        // const newBoard = new BoardModel(id, name);                
        // this.#boarView.init(newBoard);                  
    }

    filterColumn(){
        // Hacer el filtro de tareas por columnas 
    }
}