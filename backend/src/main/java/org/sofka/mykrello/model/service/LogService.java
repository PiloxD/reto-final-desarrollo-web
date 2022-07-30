package org.sofka.mykrello.model.service;

import java.util.Optional;

import org.sofka.mykrello.model.domain.LogDomain;
import org.sofka.mykrello.model.repository.LogRepository;
import org.sofka.mykrello.model.service.interfaces.LogServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** Clase para los servicios de los registros
 * @autor Andrés Díaz & Andrés Taborda
 */
@Service
public class LogService implements LogServiceInterface {

    @Autowired
    private LogRepository logRepository;

    /** Trae un registro por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id
     * @return
     */
    @Override
    public Optional<LogDomain> findById(Integer id) {
        return logRepository.findById(id);
    }

    /** Crea un nuevo registro
     * @autor Andrés Díaz & Andrés Taborda
     * @param log
     * @return
     */
    @Override
    public LogDomain create(LogDomain log) {
        return logRepository.save(log);
    }
}
