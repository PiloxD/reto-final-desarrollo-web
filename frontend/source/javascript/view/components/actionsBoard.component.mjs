import { BoardController } from "../../controller/board.controller.mjs";
export class ActionsBoard {
   
    constructor() {
        this.#privateGenerateButtons();
    }


    #privateGenerateButtons() {
        const $actionsContainer = document.querySelector('.actios-boards-buttons');

        const $actions = document.createElement('div');
        $actions.classList.add('buttons-container');

        const $deleteButton = document.createElement('div');
        $deleteButton.classList.add('delete-button');
        $deleteButton.innerHTML = `
            <span>Drag for Delete board</span>
            <i class="bi bi-trash-fill"></i>
        `;
        $deleteButton.addEventListener('dragenter', this.dragEnter);
        $deleteButton.addEventListener('dragover', this.dragOver);
        $deleteButton.addEventListener('dragleave', this.dragleave);
        $deleteButton.addEventListener('drop', this.drop);        

        const $createButton = document.createElement('button');
        $createButton.innerHTML = `
            <span>Create a new Board</span>
            <i class="bi bi-kanban-fill"></i>
        `;
        $createButton.classList.add('create-button');
        const boardController = new BoardController();
        $createButton.addEventListener('click', () => {
            boardController.captureInfoBoard(null,"create")
        });
        
        $actions.append($createButton, $deleteButton);
        $actionsContainer.append($actions);

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
    
    drop() {
        const idBoard = JSON.parse(localStorage.getItem('id-board'));
        Swal.fire({
            title: '¿Desea eliminar el board?',
            icon: 'warning',
            confirmButtonText: 'Si mi teacher.',
            showCloseButton:true,
            cancelButtonText: 'Cancelar.',
            
        })
        .then((result) => {
            if (result.isConfirmed) {
                const boardController = new BoardController();
                boardController.deleteBoard();
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