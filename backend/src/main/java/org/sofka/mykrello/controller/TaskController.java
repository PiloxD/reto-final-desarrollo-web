package org.sofka.mykrello.controller;

import org.sofka.mykrello.model.domain.TaskDomain;
import org.sofka.mykrello.model.service.TaskService;
import org.sofka.mykrello.utilities.MyResponseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/** Clase para el controlador de las tareas
 * @autor Andrés Díaz & Andrés Taborda
 */
@CrossOrigin(value = "*")
@RestController
public class TaskController {

    @Autowired
    private MyResponseUtility response;

    @Autowired
    private TaskService taskService;

    /** Trae todas las tareas según el ID de un tablero
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @return
     */
    @GetMapping(path = "/api/v1/tasks/{idBoard}")
    public ResponseEntity<MyResponseUtility> getAllTaskById(@PathVariable(value = "idBoard") Integer id) {
        response.data = taskService.findAllTasksById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** Trae una tarea por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @return
     */
    @GetMapping(path = "/api/v1/task/{id}")
    public ResponseEntity<MyResponseUtility> getTaskById(@PathVariable(value = "id") Integer id) {
        response.data = taskService.findById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** Actualiza la columna en la que se encuentra una tarea por su ID y crea un nuevo registro
     * @autor Andrés Díaz & Andrés Taborda
     * @param idColum
     * @param idTask
     * @return
     */
    @GetMapping(path = "/api/v1/taskMoveTo/{idTask}/{idColum}")
    public ResponseEntity<MyResponseUtility> moveTask(@PathVariable(value = "idColum") Integer idColum,
                                                      @PathVariable(value = "idTask") Integer idTask) {
        response.data = taskService.moveToColumn(idColum,idTask);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /** Crea una tarea nueva
     * @autor Andrés Díaz & Andrés Taborda
     * @param task
     * @param idBoard
     * @return
     */
    @PostMapping(path = "/api/v1/task/{idBoard}")
    public ResponseEntity<MyResponseUtility> create(@RequestBody TaskDomain task, @PathVariable(value = "idBoard")Integer idBoard) {
        response.data = taskService.create(task, idBoard);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** Actualiza una tarea por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @param task
     * @return
     */
    @PutMapping(path = "/api/v1/task/{id}")
    public ResponseEntity<MyResponseUtility> put(@PathVariable(value = "id") Integer id,
                                                 @RequestBody TaskDomain task) {
        response.data = taskService.update(id, task);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** Elimina una tarea por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @return
     */
    @DeleteMapping(path = "/api/v1/task/{id}")
    public ResponseEntity<MyResponseUtility> delete(@PathVariable(value = "id") Integer id) {
        response.data = taskService.delete(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
