package org.sofka.mykrello.model.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

@Data
@Entity
@Table(name = "krl_task")
@JsonIgnoreProperties(value = {"column","log_task_id"}, allowGetters = true)
public class TaskDomain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tsk_id", nullable = false)
    private Integer id;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = LogDomain.class, cascade = CascadeType.ALL, mappedBy = "idTasks")
    @JsonManagedReference(value = "logForTasks")
    private List<LogDomain> logForTask = new ArrayList<>();
    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JsonBackReference("task_column")
    @JoinColumn(name = "clm_id_column", referencedColumnName = "clm_id", nullable = false)
    private ColumnDomain column;
}
