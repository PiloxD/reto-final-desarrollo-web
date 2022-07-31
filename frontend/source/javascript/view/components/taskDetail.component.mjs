export class TaskDetail {
    #state
    #task

    constructor(task) {
        this.#createDetails(task[0]);


    }

    get() {
        return this.#state;
    }

    #createDetails(taskForDetail) {
        const name = taskForDetail.getName()
        const description = taskForDetail.getDescription()
        const logs = taskForDetail.getLogForTask()
        const $formContainer = document.createElement('div');
        $formContainer.classList.add('form-container');

        $formContainer.innerHTML = `        
           <div><h1>${name}</h1></div>
           <div><h1>${description}</h1></div>

        `
        logs.map(log => {
            const previous = log.idClmPrevious
            const current = log.idClmCurrent
            const date = log.createdAt

            $formContainer.innerHTML += ` 
            <div>Previous: ${previous} Current: ${current} Last Update: ${date} </div>
            
            `
        })
        this.#state = $formContainer;
    }
}   