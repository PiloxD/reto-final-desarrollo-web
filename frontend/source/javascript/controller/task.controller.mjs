import { TaskService } from "../model/services/task.service.mjs";


export class TaskController{
    

    async getTasks(idBoard) {
        console.log(idBoard);
        const taskService = new TaskService();
        const response = await taskService.getTasksForBoard(idBoard);
        const data = response.data;  
        console.log(data);      
        // const {name} = data;
        // const newBoard = new BoardModel(id, name);                
        // this.#boarView.init(newBoard);                  
    }
}