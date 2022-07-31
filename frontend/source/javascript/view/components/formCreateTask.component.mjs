export class TaskForm {
    #form;

    constructor(handleChange){
        this.#createForm(handleChange);
    };

    get() {
        return this.#form;
    }

    #createForm(handleChange){
        const $formContainer = document.createElement('div');
        $formContainer.classList.add('form-container');

        $formContainer.innerHTML= `        
            <form id = "task-form">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Titulo de la tarea</label>
                    <input type="text" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>                    
                </div>   
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                    <textarea name="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="delivery-date" class="form-label">Fecha de entrega:</label>
                    <input id="delivery-date" name="deliveryDate" class="form-control" type="date" />
                </div>        
                <button type="button" id="form-button" class="btn btn-primary">Crear</button>
            </form>
        `
        this.#form = $formContainer;
    }

}