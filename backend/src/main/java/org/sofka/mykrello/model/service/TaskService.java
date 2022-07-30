package org.sofka.mykrello.model.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.sofka.mykrello.model.domain.ColumnDomain;
import org.sofka.mykrello.model.domain.LogDomain;
import org.sofka.mykrello.model.domain.TaskDomain;
import org.sofka.mykrello.model.repository.TaskRepository;
import org.sofka.mykrello.model.service.interfaces.TaskServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Clase para los servicios de las tareas
 * @autor Andrés Díaz & Andrés Taborda
 */
@Service
public class TaskService implements TaskServiceInterface {

    @Autowired
    private LogService logService;

    @Autowired
    private TaskRepository taskRepository;

    /*@Override
    @Transactional(readOnly = true)
    public List<TaskDomain> findAllTasksById(Integer idBoard) {
        return taskRepository.findAllById(Collections.singleton(idBoard));
    }*/

    /** Trae todas las tareas por el ID del tablero
     * @autor Andrés Díaz & Andrés Taborda
     * @param idBoard
     * @return
     */
    @Transactional(readOnly = true)
    public List<TaskDomain> findAllTasksById(Integer idBoard) {
        return taskRepository.getTasksByBoard(idBoard);
    }

    /** Trae una tarea por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TaskDomain> findById(Integer id) {
        var task = taskRepository.findById(id);
        return task.isPresent() ? Optional.of(task.get()) : null;

    }

    /** Crea una nueva tarea en un tablero seleccionado por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param task
     * @param idBoard
     * @return
     */
    @Override
    public TaskDomain create(TaskDomain task, Integer idBoard) {
        task.setIdBoard(idBoard);
        task.setIdColumn(1);
        var log = new LogDomain();
        var newTask = taskRepository.save(task);
        log.setIdTasks(newTask);
        logService.create(log);
        return newTask;
    }

    /** Actualiza una tarea por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @param task
     * @return
     */
    @Override
    public TaskDomain update(Integer id, TaskDomain task) {
        var oldTasks = taskRepository.findById(id).get();
        task.setId(id);

        if (task.getName() != null) {
            String name = task.getName();
            oldTasks.setName(name);
        }

        if (task.getDescription() != null) {
            String description = task.getDescription();
            oldTasks.setDescription(description);
        }

        if (task.getDeliveryDate() != null) {
            Instant deliveryDate = task.getDeliveryDate();
            oldTasks.setDeliveryDate(deliveryDate);
        }

        oldTasks.setUpdatedAt(Instant.now());

        return taskRepository.save(oldTasks);
    }

    /** Elimina una tarea por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @return
     */
    @Override
    public TaskDomain delete(Integer id) {
        var optionalTask = taskRepository.findById(id);
        if (optionalTask != null) {
            var task = optionalTask.get();
            taskRepository.delete(task);
        }
        return null;
    }

    /** Mueve una tarea a la columna seleccionada por sus ID y crea un nuevo registro
     * @autor Andrés Díaz & Andrés Taborda
     * @param idColumn
     * @param idTask
     * @return
     */
    @Override
    public TaskDomain moveToColumn(Integer idColumn, Integer idTask) {
        var targetTask = taskRepository.findById(idTask);
        if (targetTask != null) {
            var task = targetTask.get();
            Integer previousColumn = task.getIdColumn();
            task.setIdColumn(idColumn);
            TaskDomain taskUpdate = taskRepository.save(task);

            LogDomain newLog = new LogDomain();
            newLog.setIdTasks(taskUpdate);
            newLog.setIdClmPrevious(previousColumn);
            newLog.setIdClmCurrent(idColumn);
            logService.create(newLog);
            return task;
        }
        return null;
    }
}
