import { Config } from '../../config.mjs'
import { BoardModel } from '../board.model.mjs'

export class BoardService {
    
    // GET Traer todos los tableros
    getAllBoards() {
        return fetch(`${Config.API_URL}boards`)
        .then(response => response.json());         
    }
    // // GET Traer un tablero por su ID
    getBoardById(id){
        return fetch(`${Config.API_URL}board/${id}`)
        .then(response => response.json());        
    } 

    // POST Crear un tablero nuevo
    createBoard(nameBoard){        
        fetch(`${Config.API_URL}board`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    "name": `${nameBoard}`,
                }
            ),
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err)); 

    } 

    // PUT Actualizar nombre de un tablero 
    updateBoardName(id, nameBoard){
        return fetch(`${Config.API_URL}board/${id}`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    "name": `${nameBoard}`,
                }
            ),
            headers: {
                'Content-Type': 'application/json'                
            }
        })
    }
    // DELETE Elimina un tablero por su ID 
    deleteBoardById = (id) =>{
        axios.delete(`${Config.API_URL}board/${id}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    } 
    
}


