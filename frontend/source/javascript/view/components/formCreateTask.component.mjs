export class TaskForm {
    #form;

    constructor(){
        this.#createForm();
    }

    get() {
        return this.#form;
    }

    #createForm(){
        const formContainer = `        
            <form id = "task-form">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Task title</label>
                    <input type="text" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>                    
                </div>   
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Task Description</label>
                    <textarea name="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="delivery-date" class="form-label">Delivery Date</label>
                    <input id="delivery-date" name="deliveryDate" class="form-control" type="date" />
                </div>        
            </form>
        `
        this.#form = formContainer;
    }

}