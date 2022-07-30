package org.sofka.mykrello.model.service;

import java.util.List;

import org.sofka.mykrello.model.domain.BoardDomain;
import org.sofka.mykrello.model.domain.ColumnForBoardDomain;
import org.sofka.mykrello.model.repository.BoardRepository;
import org.sofka.mykrello.model.repository.ColumnForBoardRepository;
import org.sofka.mykrello.model.repository.ColumnRepository;
import org.sofka.mykrello.model.service.interfaces.BoardServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Clase para los servicios de los tableros
 * @autor Andrés Díaz & Andrés Taborda
 */
@Service
public class BoardService implements BoardServiceInterface {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private ColumnRepository columnRepository;

    @Autowired
    private ColumnForBoardRepository columnForBoardRepository;

    /** Trae todos los tableros
     * @autor Andrés Díaz & Andrés Taborda
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public List<BoardDomain> getAll() {
        return boardRepository.findAll();
    }

    /** Trae un tablero por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id Identificador del tablero
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public BoardDomain findById(Integer id) {
        var board = boardRepository.findById(id);
        return board.isPresent() ? board.get() : null;
    }

    /** Crear un tablero nuevo tablero con el nombre recibido como parametro
     * @autor Andrés Díaz & Andrés Taborda
     * @param board Datos del tablero a crear
     * @return tablero nuevo: newBoard
     */
    @Override
    @Transactional
    public BoardDomain create(BoardDomain board) {
        board.preUpdate();
        var newBoard = boardRepository.save(board);
        var columns = columnRepository.findAll();
        if (!columns.isEmpty()) {
            columns.forEach(column -> {
                var columnForBoard = new ColumnForBoardDomain();
                columnForBoard.setColumn(column);
                columnForBoard.setBoard(newBoard);
                columnForBoardRepository.save(columnForBoard);
            });
        }
        return newBoard;
    }

    /** Actualiza el tablero con un nuevo nombre
     * @autor Andrés Díaz & Andrés Taborda
     * @param id    Identificador del tablero a actualizar
     * @param board Datos del tablero a actualizar
     * @return
     */
    @Override
    @Transactional
    public BoardDomain update(Integer id, BoardDomain board) {
        board.setId(id);
        return boardRepository.save(board);
    }

    /** Elimina un tablero por su ID
     * @autor Andrés Díaz & Andrés Taborda
     * @param id Identificador del tablero a borrar
     * @return
     */
    @Override
    @Transactional
    public BoardDomain delete(Integer id) {
        var optionalBoard = boardRepository.findById(id);
        if (optionalBoard.isPresent()) {
            var board = optionalBoard.get();
            var columnsForBoard = board.getColumnsForBoard();
            if (!columnsForBoard.isEmpty()) {
                columnsForBoard.forEach((column) -> {
                    columnForBoardRepository.delete(column);
                });
            }
            boardRepository.delete(optionalBoard.get());
            return optionalBoard.get();
        }
        return null;
    }

}
