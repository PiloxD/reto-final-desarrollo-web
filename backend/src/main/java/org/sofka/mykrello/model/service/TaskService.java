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

    @Override
    @Transactional(readOnly = true)
    public Optional<TaskDomain> findById(Integer id) {
        var task = taskRepository.findById(id);
        return task.isPresent() ? Optional.of(task.get()) : null;

    }

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

    @Override
    public TaskDomain delete(Integer id) {
        var optionalTask = taskRepository.findById(id);
        if (optionalTask != null) {
            var task = optionalTask.get();
            taskRepository.delete(task);
        }
        return null;
    }

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
