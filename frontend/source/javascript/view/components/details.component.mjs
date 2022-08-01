import { TaskController } from "../../controller/task.controller.mjs";

export class DescriptionTask {
    #description

    constructor(task){
        this.#createDetails(task);
    }

    get() {
        return this.#description;
    }

    #createDetails(task) {
        const name = task.getName();
        const description = task.getDescription();
        const deliveryDate = task.getDeliveryDate();        

        const domDescription =  `
            <div class = "details-title">
                <h3>${name}</h3>
            </div>
            <div class = "details-description">
                <p>${description}</p>
            </div>
            <div class = "details-description">
                <p>${deliveryDate}</p>
            </div>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Preview column</th>
                            <th scope="col">Current column</th>
                            <th scope="col">Update at</th>
                        </tr>
                    </thead>
                    <tbody id="details-logs">                        
                    </tbody>
                </table>
            </div>  
            <div class="description-buttons">
                <button id= "delete-task" class="delete-task">Delete task</button>
                <button id= "update-task" class="update-task">Edit task</button>
            </div>      
        `;
        this.#description = domDescription;
    }
}