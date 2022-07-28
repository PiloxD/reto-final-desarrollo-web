package org.sofka.mykrello.model.service;

import java.util.Optional;

import org.sofka.mykrello.model.domain.LogDomain;
import org.sofka.mykrello.model.repository.LogRepository;
import org.sofka.mykrello.model.service.interfaces.LogServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogService implements LogServiceInterface {

    @Autowired
    private LogRepository logRepository;
    @Override
    public Optional<LogDomain> findById(Integer id) {
        return logRepository.findById(id);
    }

    @Override
    public LogDomain create(LogDomain log) {
        return logRepository.save(log);
    }
}
