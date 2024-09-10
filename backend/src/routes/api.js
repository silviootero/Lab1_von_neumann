const express = require('express');
const router = express.Router();
const CPU = require('../controllers/cpuController');

// Instancia de la CPU
let cpu = new CPU();

// Ruta para iniciar el ciclo paso a paso
router.get('/run-cycle', (req, res) => {
    cpu.runCycle((registers, operation, finished) => {
        res.status(200).json({
            registers: registers,
            operation: operation,  // Enviar la operación decodificada
            finished: finished
        });
    });
});

// Ruta para pausar el ciclo
router.post('/pause-cycle', (req, res) => {
    cpu.pause();
    res.status(200).json({ message: 'Ciclo pausado' });
});

// Ruta para reanudar el ciclo
router.post('/resume-cycle', (req, res) => {
    cpu.resume();
    res.status(200).json({ message: 'Ciclo reanudado' });
});

// Ruta para ejecutar un solo paso del ciclo
router.get('/run-step-by-step', (req, res) => {
    cpu.runStepByStep((registers, operation, finished) => {
        res.status(200).json({
            registers: registers,
            operation: operation,
            finished: finished
        });
    });
});

// Ruta para llenar la memoria con los datos enviados desde el frontend
router.post('/fill-memory', (req, res) => {
    const { operation, dato1, dato2 } = req.body;

    try {
        // Usar la función de Memory para llenar la memoria con los datos enviados
        cpu.memory.fillWithOperationData(operation, dato1, dato2);
        res.status(200).json({ message: `Memoria llena con operación: ${operation}`, memory: cpu.memory.memory });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para reiniciar la CPU (reset)
router.post('/reset', (req, res) => {
    cpu = new CPU(); // Reinicia la CPU creando una nueva instancia
    res.status(200).json({ message: 'CPU reiniciada' });
});

// Ruta para obtener el estado actual de los registros de la CPU
router.get('/cpu-status', (req, res) => {
    res.status(200).json(cpu.registers);
});

// Ruta para obtener el estado de la memoria
router.get('/memory-status', (req, res) => {
    res.status(200).json(cpu.memory.memory); // Devolver el contenido de la memoria
});

module.exports = router;
