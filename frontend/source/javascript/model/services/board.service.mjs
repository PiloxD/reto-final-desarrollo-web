import { Config } from '../../config.mjs'
import { BoardModel } from '../board.model.mjs'

export class BoardService {
    constructor() {
    }

    // GET Traer todos los tableros
    getAllBoards = axios.get(`${Config.API_URL}boards`)
        .then(response => {
            console.log("response: ",response)
            return response.json()
        })
        .catch(e => {
            console.log(e);
        })

    // // GET Traer un tablero por su ID
    // getBoardById = axios.get(`${Config.API_URL}board/${id}`)
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     })

    // // POST Crear un tablero nuevo
    // createBoard = axios.post(`${Config.API_URL}board`, BoardModel)
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // // PUT Actualizar nombre de un tablero 
    // updateBoardName = axios.put(`${Config.API_URL}board/${id}`, BoardModel)
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // // DELETE Elimina un tablero por su ID 
    // deleteBoardById = axios.delete(`${Config.API_URL}board/${id}`)
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });



}


