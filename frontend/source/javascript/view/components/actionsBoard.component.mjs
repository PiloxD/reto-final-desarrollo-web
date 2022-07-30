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

        const $createButton = document.createElement('button');
        $createButton.innerHTML = `
            <span>Create a new Board</span>
            <i class="bi bi-kanban-fill"></i>
        `;
        $createButton.classList.add('create-button');

        $actions.append($createButton, $deleteButton);
        $actionsContainer.append($actions);

    }
    
}