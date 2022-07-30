package org.sofka.mykrello.model.repository;

import org.sofka.mykrello.model.domain.TaskDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskDomain, Integer> {
    @Query(value= "SELECT * FROM krl_task where brd_id_board = ?1", nativeQuery = true)
    List<TaskDomain>getTasksByBoard(Integer idBoard);
}
