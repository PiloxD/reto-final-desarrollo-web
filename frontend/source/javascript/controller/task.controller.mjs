import { TaskService } from "../model/services/task.service.mjs";
import { ListTasks } from "../model/listTask.model.mjs";
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
        return this.#allTasks;
    }

    moveTask(idColumn, idTaks) {
        const taskService = new TaskService();
        taskService.getAndMoveTask(idColumn, idTaks);
    }

    showForm(id, operation, idBoard) {
        const form = new TaskForm();
        Swal.fire({
            html:
            form.get(),
            confirmButtonText: "Confirm",
            showCloseButton:true
        }).then((result) =>{
            if (result.isConfirmed) {
                this.getData(id, operation, idBoard);
            }
        })
    }

    getData(id, operation, idBoard) {
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
        this.typeRequest(operation, id, newTask, idBoard);
    }

    createTask(idBoard, newTask) {
        const taskService = new TaskService();
        taskService.createTask(idBoard, newTask);
    }

    taskFilter(taskList, taskId) {
        return taskList.find(item => item.getId() === taskId)
    }

    updateTask(idTask, newTask, idBoard){
        const taskService = new TaskService();
        taskService.updateTaskById(idTask,newTask, idBoard);
    }
    typeRequest(operation, id, newTask, idBoard){
        if (newTask.name !== "" && operation === "create") {            
            this.createTask(id, newTask)
        }else if(operation === "update") {
            this.updateTask(id, newTask, idBoard)
        }
    }
    
    deleteTask(idTaks, idBoard){       
        Swal.fire({
            title: '¿Desea eliminar la tarea?',
            icon: 'warning',
            confirmButtonText: 'Continuar.',
            showCloseButton:true,
            cancelButtonText: 'Cancelar.',            
        })
        .then((result) => {
            if (result.isConfirmed) {
                const taskService = new TaskService();
                taskService.deleteTaskById(idTaks, idBoard);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully',
                })
            } 
        })
    }
}