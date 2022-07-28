package org.sofka.mykrello.model.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;

@Data
@Entity
@Table(name = "krl_log")
//@JsonIgnoreProperties(value = {"idTasks","previous", "current"}, allowGetters = true)
public class LogDomain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id", nullable = false, updatable = false)
    private Integer id;

    @Column(name = "clm_id_previous")
    private Integer idClmPrevious=1;

    @Column(name = "clm_id_current")
    private Integer idClmCurrent=1;


    @ManyToOne(fetch = FetchType.LAZY, targetEntity = TaskDomain.class, optional = false, cascade = CascadeType.DETACH)
    @JoinColumn(name = "tsk_id_task", nullable = false)
    @JsonBackReference(value = "logForTasks")
    private TaskDomain idTasks;
/*

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = ColumnDomain.class, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "clm_id_previous", nullable = false, updatable = false, insertable = false)
    @JsonBackReference(value = "logPrevious")
    private ColumnDomain previous;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = ColumnDomain.class, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "clm_id_current", nullable = false, updatable = false, insertable = false)
    @JsonBackReference(value = "logCurrent")
    private ColumnDomain current;
*/

    @Column(name = "log_created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
