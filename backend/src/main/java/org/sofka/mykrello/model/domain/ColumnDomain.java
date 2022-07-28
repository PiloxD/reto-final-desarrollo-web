package org.sofka.mykrello.model.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
@Table(name = "krl_column")
public class ColumnDomain implements Serializable {

    private static final long serialVersionUID = 1L;

    @PreUpdate
    public void preUpdate() {
        if (this.updatedAt == null)
            this.updatedAt = Instant.now();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clm_id", nullable = false)
    private Integer id;

    @Column(name = "clm_name", nullable = false, length = 100)
    private String name;

    @Column(name = "clm_created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "clm_updated_at")
    private Instant updatedAt;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = LogDomain.class, cascade = CascadeType.ALL, mappedBy = "previous")
    @Transient
    @JsonManagedReference(value = "logPrevious")
    private List<LogDomain> logPrevious = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, targetEntity = LogDomain.class, cascade = CascadeType.ALL, mappedBy = "current")
    @Transient
    @JsonManagedReference(value = "logCurrent")
    private List<LogDomain> logCurrent = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, targetEntity = ColumnForBoardDomain.class, cascade = CascadeType.ALL, mappedBy = "column")
    @JsonBackReference(value = "column-columnForBoard")
    private List<ColumnForBoardDomain> columnForBoards = new ArrayList<>();


    @OneToMany(targetEntity = TaskDomain.class,fetch = FetchType.EAGER, mappedBy = "column")
    @JsonManagedReference(value = "task_column")
    private List<TaskDomain> tasks = new ArrayList<>();

}
