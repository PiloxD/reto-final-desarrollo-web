package org.sofka.mykrello.controller;

import org.sofka.mykrello.model.domain.BoardDomain;
import org.sofka.mykrello.model.service.BoardService;
import org.sofka.mykrello.utilities.MyResponseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/** Clase para el controlador de los tableros
 * @autor Andrés Díaz & Andrés Taborda
 */
@RestController
@CrossOrigin(value = "*")
public class BoardController {

    @Autowired
    private MyResponseUtility response;

    @Autowired
    private BoardService boardService;

    /** Trae todos los tableros
     * @autor Andrés Díaz & Andrés Taborda
     * @return
     */
    @GetMapping(path = "/api/v1/boards")
    public ResponseEntity<MyResponseUtility> index() {
        response.data = boardService.getAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** Trae un tablero por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @return
     */
    @GetMapping(path = "/api/v1/board/{id}")
    public ResponseEntity<MyResponseUtility> getBoardById(@PathVariable(value = "id") Integer id) {
        response.data = boardService.findById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** Crea un tablero nuevo
     * @autor Andrés Díaz & Andrés Taborda
     * @param board
     * @return
     */
    @PostMapping(path = "/api/v1/board")
    public ResponseEntity<MyResponseUtility> create(@RequestBody BoardDomain board) {
        response.data = boardService.create(board);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** Actualiza un tablero por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @param board
     * @return
     */
    @PutMapping(path = "/api/v1/board/{id}")
    public ResponseEntity<MyResponseUtility> put(@PathVariable(value = "id") Integer id,
            @RequestBody BoardDomain board) {
        System.out.println(board + ":D Aqui");
        response.data = boardService.update(id, board);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** Elimina un tablero por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @return
     */
    @DeleteMapping(path = "/api/v1/board/{id}")
    public ResponseEntity<MyResponseUtility> delete(@PathVariable(value = "id") Integer id) {
        response.data = boardService.delete(id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}
