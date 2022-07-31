package org.sofka.mykrello.model.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

@Data
@Entity
@Table(name = "krl_task")
@JsonIgnoreProperties(value = {"column","logForTask"}, allowGetters = true)
public class TaskDomain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tsk_id", nullable = false)
    private Integer id;


    @Column(name = "tsk_name", nullable = false, length = 100)
    private String name;

    @Column(name = "tsk_description", length = 2000)
    private String description;

    @Column(name = "tsk_delivery_date")
    private String deliveryDate;

    @Column(name = "tsk_created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "tsk_updated_at")
    private Instant updatedAt;

    @Column(name = "brd_id_board")
    private Integer idBoard;

    @Column(name = "clm_id_column")
    private Integer idColumn;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = LogDomain.class, cascade = CascadeType.ALL, mappedBy = "idTasks")
    @JsonManagedReference(value = "logForTasks")
    private List<LogDomain> logForTask = new ArrayList<>();

    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JsonBackReference("task_column")
    @JoinColumn(name = "clm_id_column", referencedColumnName = "clm_id", nullable = false, updatable = false, insertable = false)
    private ColumnDomain column;

    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JsonBackReference("tasksForBoard")
    @JoinColumn(name = "brd_id_board", referencedColumnName = "brd_id", nullable = false, updatable = false, insertable = false)
    private BoardDomain boardId;
}
