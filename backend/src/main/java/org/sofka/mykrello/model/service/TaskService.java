package org.sofka.mykrello.model.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.sofka.mykrello.model.domain.ColumnDomain;
import org.sofka.mykrello.model.domain.LogDomain;
import org.sofka.mykrello.model.domain.TaskDomain;
import org.sofka.mykrello.model.repository.TaskRepository;
import org.sofka.mykrello.model.service.interfaces.TaskServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService implements TaskServiceInterface {

    @Autowired
    private LogService logService;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<TaskDomain> findAllTasksById(Integer idBoard) {
        return taskRepository.findAllById(Collections.singleton(idBoard));
    }

    @Override
    public Optional<TaskDomain> findById(Integer id) {
        return taskRepository.findById(id);
    }

    @Override
    public TaskDomain create(TaskDomain task) {
        var newTask = taskRepository.save(task);
        LogDomain newLog = new LogDomain();
        ColumnDomain newColumn = new ColumnDomain();

        newColumn.setId(1);
        newLog.setCurrent(newColumn);
        newLog.setPrevious(newColumn);
        newLog.setIdTasks(newTask);
        logService.create(newLog);
        return newTask;
    }

    @Override
    public TaskDomain update(Integer id, TaskDomain task) {
        task.setId(id);
        return taskRepository.save(task);
    }

    @Override
    public TaskDomain delete(Integer id) {
        var optionalTask = taskRepository.findById(id);
        if (optionalTask != null){
            var task = optionalTask.get();
            taskRepository.delete(task);
        }
        return null;
    }
}
