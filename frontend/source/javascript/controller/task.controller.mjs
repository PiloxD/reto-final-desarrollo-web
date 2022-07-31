import { TaskService } from "../model/services/task.service.mjs";
import { ListTasks } from "../model/listTask.model.mjs";
import { Modal } from "../view/components/modal.component.mjs";
import { TaskForm } from "../view/components/formCreateTask.component.mjs";

export class TaskController {
    #allTasks;

    constructor() {
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
    moveTask(idColumn, idTaks) {
        const taskService = new TaskService();
        taskService.getAndMoveTask(idColumn, idTaks);
    }

    showForm(id, operation) {
        const form = new TaskForm();
        const modal = new Modal();
        modal.showModal(form.get());
        const $buttonForm = document.getElementById("form-button");
        $buttonForm.addEventListener("click", () => this.getData(id, operation));
    }

    getData(id, operation) {
        let newTask = {
            "name": null,
            "description": null,
            "deliveryDate": null
        }        
        const $form = document.getElementById("task-form");
        const formData = new FormData($form);

        newTask.name = formData.get("name");
        newTask.description = formData.get("description");
        newTask.deliveryDate = formData.get("deliveryDate");         
        this.typeRequest(operation, id, newTask);
    }

    createTask(idBoard, newTask) {
        console.log("create Task");
        const taskService = new TaskService();
        taskService.createTask(idBoard, newTask);
        const modal = new Modal();
        modal.closeModal();
    }
    taskFilter(taskList, taskId) {
        return taskList.filter(item => item.getId() === taskId)
    }

    deleteTask(idTaks){
       const taskService = new TaskService();
       taskService.deleteTaskById(idTaks);
    }

    updateTask(idTask, newTask){
        const taskService = new TaskService();
        taskService.updateTaskById(idTask,newTask);
        const modal = new Modal();
        modal.closeModal();
    }
    typeRequest(operation, id, newTask){
        if (newTask.name !== "" && operation === "create") {            
            this.createTask(id, newTask)
        }else if(operation === "update") {
            this.updateTask(id, newTask)
        }
    }

}