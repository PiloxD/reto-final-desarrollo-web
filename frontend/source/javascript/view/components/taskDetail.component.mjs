import { TaskController } from "../../controller/task.controller.mjs";

export class TaskDetail {
    #state

    constructor(task) {
        this.#createDetails(task[0]);
    }

    get() {
        return this.#state;
    }

    #createDetails(taskForDetail) {
        const taskController = new TaskController;
        const idTask = taskForDetail.getId();
        const name = taskForDetail.getName()
        const description = taskForDetail.getDescription()
        const logs = taskForDetail.getLogForTask()
        const $detailsContainer = document.createElement('div');
        $detailsContainer.classList.add('form-container');

        $detailsContainer.innerHTML = `        
           <div><h1>${name}</h1></div>
           <div><h1>${description}</h1></div>
        `
        logs.map(log => {
            const previous = log.idClmPrevious
            const current = log.idClmCurrent
            const date = log.createdAt
            $detailsContainer.innerHTML += ` 
            <div>Previous: ${previous} Current: ${current} Last Update: ${date} </div>            
            `
        })
        const $deleteButton = document.createElement('button');
        $deleteButton.classList.add('delete-task');
        $deleteButton.type = 'button';
        $deleteButton.innerHTML = "Eliminar tarea";
        $deleteButton.addEventListener('click', () => taskController.deleteTask(idTask));

        const $updateButton = document.createElement('button');
        $updateButton.classList.add('update-task');
        $updateButton.type = 'button';
        $updateButton.innerHTML = "Editar tarea";
        $updateButton.addEventListener('click', () => taskController.showForm(idTask, "update"));

        $detailsContainer.append($deleteButton, $updateButton);
        this.#state = $detailsContainer;
    }
}   