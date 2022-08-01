export class Modal {

    showModal(component){
        const $container = document.querySelector("#container");

        const $overlay = document.createElement("div");
        $overlay.classList.add('overlay');

        const $modalContainer = document.createElement("div");
        $modalContainer.classList.add('modal-container');

        const closeButton = document.createElement("button");
        closeButton.classList.add('close-modal');
        closeButton.type = "button";
        closeButton.innerHTML =` 
            <i class="bi bi-x-circle-fill"></i>
        ` 
        closeButton.addEventListener("click", this.closeModal);

        $modalContainer.append(closeButton, component);      
        $overlay.append($modalContainer);
        $container.append($overlay);
    }


}