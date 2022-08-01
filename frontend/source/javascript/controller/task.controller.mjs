import { TaskService } from "../model/services/task.service.mjs";
import { ListTasks } from "../model/listTask.model.mjs";
import { TaskForm } from "../view/components/formCreateTask.component.mjs";

export class TaskController {
    #allTasks;

    constructor() {
        this.#allTasks = new Array()
    }
    /**
     * Este método sirve para instanciar todas las tareas de un tablero según su ID
     * @param {*} idBoard ID del tablero 
     * @returns  {*} #allTasks Retorna todas las tareas
     */
    async getTasks(idBoard) {
        const taskService = new TaskService();
        const response = await taskService.getAllTaskByBoardId(idBoard);
        const data = response.data;
        const listTask = new ListTasks();
        this.#allTasks = await listTask.getList(data);
        return this.#allTasks;
    }
    /**
     *  Este método sirve para cambiar la columna en la que se encuentra una tarea
     * @param {*} idColumn ID de la columna
     * @param {*} idTaks  ID de la tarea
     */
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
    /**
     *  Este método sirve para capturar la información de una tarea nueva
     * @param {*} id 
     * @param {*} operation
     * @param {*} idBoard 
     */
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
    /**
     *  Este método sirve para crear una tarea nueva invocando el servicio de las tareas
     * @param {*} idBoard ID del tablero en el que se creará la tarea
     * @param {*} newTask Información de la nueva tarea
     */
    createTask(idBoard, newTask) {
        const taskService = new TaskService();
        taskService.createTask(idBoard, newTask);
    }
    /**
     * Filtra la tarea a la cual se le hizo click para visualizar su información
     * @param {*} taskList Lista de todas las tareas
     * @param {*} taskId  ID de la tarea a filtrar
     * @returns 
     */
    taskFilter(taskList, taskId) {
        return taskList.find(item => item.getId() === taskId)
    }
    /**
     * Elimina una tarea por su ID
     * @param {*} idTaks ID de la tarea
     */
    deleteTask(idTaks) {
        const taskService = new TaskService();
        taskService.deleteTaskById(idTaks);
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
    /**
     * Actualiza una tarea
     * @param {*} idTask ID de la tarea a actualizar
     * @param {*} newTask Información de la tarea
     */
    updateTask(idTask, newTask) {
        const taskService = new TaskService();
        taskService.updateTaskById(idTask, newTask);
    }

    typeRequest(operation, id, newTask) {
        if (newTask.name !== "" && operation === "create") {
            this.createTask(id, newTask)
        } else if (operation === "update") {
            this.updateTask(id, newTask)
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