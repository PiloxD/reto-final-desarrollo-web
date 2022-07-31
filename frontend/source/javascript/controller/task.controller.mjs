import { TaskService } from "../model/services/task.service.mjs";
import { ListTasks } from "../model/listTask.model.mjs";
import { Modal } from "../view/components/modal.component.mjs";
import { TaskForm } from "../view/components/formCreateTask.component.mjs";

export class TaskController {
    #allTasks;

    constructor(){
        this.#allTasks = new Array()

    }

    async getTasks(idBoard) {
        const taskService = new TaskService();
        const response = await taskService.getAllTaskByBoardId(idBoard);
        const data = response.data;
        const listTask = new ListTasks();
        this.#allTasks = await listTask.getList(data);
        return this.#allTasks
        
    }
    moveTask(idColumn, idTaks){
        const taskService = new TaskService();
        taskService.getAndMoveTask(idColumn, idTaks);
    }

    showForm(idBoard){
        const form = new TaskForm(this.handleChange);
        const modal = new Modal();
        modal.showModal(form.get());        
        const $buttonForm = document.getElementById("form-button");
        $buttonForm.addEventListener("click",() => this.getData(idBoard));        
    }
    getData(idBoard){
        const $form = document.getElementById("task-form");
        const formData  = new FormData($form);

        if (formData.get("name") !== ""){ 
            let newTask = {
                "name": "",
                "description": "",
                "deliveryDate": null
            }
            
            newTask.name = formData.get("name");
            newTask.description = formData.get("description");
            let date = formData.get("deliveryDate").split("-");
            const day = date[2];
            const mouth = date[1];
            const year = date[0];
            const fecha = `${mouth}/${day}/${year}`;
            newTask.deliveryDate = fecha;                        
            this.createTask(idBoard,newTask)
        }else{  alert("Ingrese un nombre valido para su tarea"); }        
    }

    createTask(idBoard,newTask){
        const taskService = new TaskService();
        taskService.createTask(idBoard,newTask);
        const modal = new Modal();
        modal.closeModal();
    }


}