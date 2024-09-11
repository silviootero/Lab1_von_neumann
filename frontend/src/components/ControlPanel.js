import React, { useState } from 'react';
import '../ComponentStyles.css';

function ControlPanel({ fillMemory, loadProgram, executeStep, pauseCycle, resumeCycle, resetCycle }) {
  const [dato1, setDato1] = useState('');
  const [dato2, setDato2] = useState('');
  const [operation, setOperation] = useState('Suma');
  const [intervalTime, setIntervalTime] = useState(1000); // Intervalo para el temporizador
  const [error, setError] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [options] = useState([
    { label: 'Suma', value: 'Suma' },
    { label: 'Resta', value: 'Resta' },
    { label: 'Multiplicación', value: 'Multiplicación' },
    { label: 'Exponente', value: 'Exponente' },
  ]);

  const validateInput = () => {
    if (parseInt(dato1) > 255 || parseInt(dato2) > 255) {
      setError('Los valores no deben superar los 255');
      return false;
    }
    setError('');
    return true;
  };

  const handleStartCycle = () => {
    if (!validateInput()) return;
    fillMemory(operation, parseInt(dato1), parseInt(dato2));
    loadProgram(intervalTime);  // Iniciar el ciclo completo
  };

  const handleStepCycle = () => {
    if (!validateInput()) return;
    fillMemory(operation, parseInt(dato1), parseInt(dato2));
    executeStep();  // Ejecutar ciclo paso a paso
  };

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };



  const handlePause = () => {
    setIsPaused(true);
    pauseCycle();
  };

  const handleResume = () => {
    setIsPaused(false);
    resumeCycle();
  };

  const handleReset = () => {
    resetCycle();  // Reiniciar el ciclo
  };

  return (
    <div>
      <div>
        <textarea
          rows="1"
          cols="10"
          placeholder="Ingrese número"
          value={dato1}
          onChange={(e) => setDato1(e.target.value)}
        />
      </div>
      <div>
        <textarea
          rows="1"
          cols="10"
          placeholder="Ingrese número"
          value={dato2}
          onChange={(e) => setDato2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="operaciones" className="text-center">Seleccione la operación:</label>
        <select id="sel" required onChange={handleOperationChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <button onClick={handleStartCycle}>Comenzar Ciclo</button>
        <button onClick={handleStepCycle}>Paso a paso</button>
        <button onClick={handlePause}>Pausar</button>
        <button onClick={handleResume}>Reanudar</button>
        <button onClick={handleReset}>Reiniciar</button> {/* Botón para reiniciar */}
      </div>
      <div>
        <label>Intervalo de tiempo (ms):</label>
          <input
            type="number"
            value={intervalTime}
            onChange={(e) => setIntervalTime(parseInt(e.target.value))}
          />
      </div>
    </div>
  );
}

export default ControlPanel;
