import { BoardView } from "../view/board.view.mjs";
import { BoardService } from "../model/services/board.service.mjs";
import { BoardModel } from "../model/board.model.mjs";
import { index } from "./index.controller.mjs";

export class BoardController{
    #boarView;
    

    constructor() {
        this.#boarView = new BoardView(); 
    }
/**
 *  Este método sirve para traer el tablero seleccionado
 * @param {*} id id del tablero seleccionado 
 */
    async getBoard(id) {
        const boardService = new BoardService();
        const response = await boardService.getBoardById(id);
        const data = response.data;  
        const {name} = data;
        const newBoard = new BoardModel(id, name);                
        this.#boarView.init(newBoard);                  
    }
/**
 * Este método sirve para eliminar un tablero
 */
    deleteBoard() {
        const id = localStorage.getItem("id-board");
        const boardToDelete = JSON.parse(id);
        const boardService = new BoardService();
        boardService.deleteBoardById(boardToDelete);
        index.init();
    }
/**
 * Este método sirve para crear un tablero nuevo desde el botón en la aplicación
 * @param {*} id 
 * @param {*} operation 
 */
    captureInfoBoard(id, operation){
        const boardService = new BoardService();
        Swal.fire({
            title: 'Titulo del tablero',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            showLoaderOnConfirm: true,
            preConfirm: (name) => {             
                if (name !== "") {
                    if (operation === "create") {                         
                        boardService.createBoard(name);                                            
                    }else{
                        boardService.updateBoardName(id, name);
                    }
                }else{
                    Swal.showValidationMessage(
                        "Ingrese un nombre valido"
                    )
                }
            },
        })    
    }

    

   
}