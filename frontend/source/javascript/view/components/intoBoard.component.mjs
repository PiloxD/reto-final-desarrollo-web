import { TaskController } from "../../controller/task.controller.mjs";
import { TaskForm } from "./formCreateTask.component.mjs";
import { Navbar } from "./navbar.component.mjs";
export class IntoBoard {
    #board
    #idBoard

    constructor(board) {
        this.#board = board;
        this.#idBoard = board.getId();
    }


    showBoard() {
        const $mainContainer = document.querySelector('#container');
        const navbar = new Navbar();
        const nav = navbar.get();
        const $main = document.createElement('div');
        $main.classList.add('main-board');

        const $boardTitle = document.createElement('h2');
        $boardTitle.id = "title-board";
        $boardTitle.textContent = this.#board.getName();
        
        const $createTaskButton = document.createElement('button');
        $createTaskButton.id = "create-task-button";
        $createTaskButton.addEventListener('click', () => this.createTask(this.#idBoard));
        $createTaskButton.innerHTML = `
            Crear tarea 
            <i class="bi bi-plus-circle-fill"></i>
        `
        $boardTitle.append($createTaskButton);
        $mainContainer.append(nav, $boardTitle, $main);
        $main.innerHTML = `
            <div class="column-container">
                <div class="column" id="column1">
                    <h3 class="title-column">Todo</h3>
                </div>
                <div class="column" id="column2">
                    <h3 class="title-column">In Process</h3>
                </div>
                <div class="column" id="column3">
                    <h3 class="title-column">Done</h3>
                </div>            
            </div>
        `;
        const columns = document.querySelectorAll('.column');
        
        columns.forEach((column, index )=>{
            Sortable.create(column,{
                group:{
                    name:"task-list"
                },
                animation: 250,
                filter: ".title-column",
                easing: "cubic-beizer(0.895, 0.03, 0.658, 0.22)",
                chosenClass: "column-drag",
                dragClass: "column-drag",
                ghostClass: "column-drag"
            });
            column.addEventListener('drop', () =>this.drop(index + 1));   
        });
        
    }

    dragEnter(e) {
        e.preventDefault();
    }
    
    dragOver(e) {
        e.preventDefault();
    }
    
    dragLeave(e) {
        //Todo
    }
    
    drop(columnId) {
        const taskController = new TaskController();
        const idTask = JSON.parse(localStorage.getItem('id-task'));
        taskController.moveTask(columnId,idTask);
    }
    getId() { return this.#idBoard;}

    createTask(idBoard){
        const taskController = new TaskController();        
        taskController.showForm(idBoard);
    }
}