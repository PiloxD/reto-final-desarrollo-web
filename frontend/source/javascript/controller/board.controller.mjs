import { BoardView } from "../view/board.view.mjs";
import { BoardService } from "../model/services/board.service.mjs";
import { BoardModel } from "../model/board.model.mjs";

export class BoardController{
    #boarView;
    #nameBoard;

    constructor() {
        this.#boarView = new BoardView();
        this.#nameBoard = "dsafs";
    }

    async getBoard(id) {
        const boardService = new BoardService();
        const response = await boardService.getBoardById(id);
        const data = response.data;  
        const {name} = data;
        const newBoard = new BoardModel(id, name);                
        this.#boarView.init(newBoard);                  
    }

    deleteBoard() {
        const id = localStorage.getItem("id-board");
        const boardToDelete = JSON.parse(id);
        const boardService = new BoardService();
        boardService.deleteBoardById(boardToDelete);
    }

    captureInfoBoard(id, operation){
        const boardService = new BoardService();
        Swal.fire({
            title: 'Titulo del tablero',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
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