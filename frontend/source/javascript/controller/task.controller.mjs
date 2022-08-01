import { TaskService } from "../model/services/task.service.mjs";
import { ListTasks } from "../model/listTask.model.mjs";
import { Modal } from "../view/components/modal.component.mjs";
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
        return this.#allTasks

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
    /**
     *  Este método sirve para visualizar el modal
     * @param {*} id 
     * @param {*} operation 
     */
    showForm(id, operation) {
        const form = new TaskForm();
        const modal = new Modal();
        modal.showModal(form.get());
        const $buttonForm = document.getElementById("form-button");
        $buttonForm.addEventListener("click", () => this.getData(id, operation));
    }
    /**
     *  Este método sirve para capturar la información de una tarea nueva
     * @param {*} id 
     * @param {*} operation 
     */
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
    /**
     *  Este método sirve para crear una tarea nueva invocando el servicio de las tareas
     * @param {*} idBoard ID del tablero en el que se creará la tarea
     * @param {*} newTask Información de la nueva tarea
     */
    createTask(idBoard, newTask) {
        console.log("create Task");
        const taskService = new TaskService();
        taskService.createTask(idBoard, newTask);
        const modal = new Modal();
        modal.closeModal();
    }
    /**
     * Filtra la tarea a la cual se le hizo click para visualizar su información
     * @param {*} taskList Lista de todas las tareas
     * @param {*} taskId  ID de la tarea a filtrar
     * @returns 
     */
    taskFilter(taskList, taskId) {
        return taskList.filter(item => item.getId() === taskId)
    }
    /**
     * Elimina una tarea por su ID
     * @param {*} idTaks ID de la tarea
     */
    deleteTask(idTaks) {
        const taskService = new TaskService();
        taskService.deleteTaskById(idTaks);
    }
    /**
     * Actualiza una tarea
     * @param {*} idTask ID de la tarea a actualizar
     * @param {*} newTask Información de la tarea
     */
    updateTask(idTask, newTask) {
        const taskService = new TaskService();
        taskService.updateTaskById(idTask, newTask);
        const modal = new Modal();
        modal.closeModal();
    }
    typeRequest(operation, id, newTask) {
        if (newTask.name !== "" && operation === "create") {
            this.createTask(id, newTask)
        } else if (operation === "update") {
            this.updateTask(id, newTask)
        }
    }

}