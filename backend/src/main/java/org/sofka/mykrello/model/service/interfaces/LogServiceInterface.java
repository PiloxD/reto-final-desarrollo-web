package org.sofka.mykrello.model.service.interfaces;

import java.util.Optional;

import org.sofka.mykrello.model.domain.LogDomain;

public interface LogServiceInterface {
    public Optional<LogDomain> findById(Integer id);
    public LogDomain create(LogDomain log);
}
