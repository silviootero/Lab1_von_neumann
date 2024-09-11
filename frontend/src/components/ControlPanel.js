import React, { useState } from 'react';

function ControlPanel({ fillMemory, startCycle, stepCycle, pauseCycle, resumeCycle }) {
  const [dato1, setDato1] = useState('');
  const [dato2, setDato2] = useState('');
  const [operation, setOperation] = useState('Suma');
  const [intervalTime, setIntervalTime] = useState(1000); // Intervalo para el temporizador


  const handleStartCycle = () => {
    fillMemory(operation, parseInt(dato1), parseInt(dato2));
    startCycle(intervalTime);  // Iniciar el ciclo completo
  };

  const handleStepCycle = () => {
    fillMemory(operation, parseInt(dato1), parseInt(dato2));
    stepCycle();  // Ejecutar ciclo paso a paso
  };

  return (
    <div className="control-panel">
      <h2>Panel de Control</h2>

      <div>
        <label>Dato 1:</label>
        <input
          type="number"
          value={dato1}
          onChange={(e) => setDato1(e.target.value)}
        />
      </div>

      <div>
        <label>Dato 2:</label>
        <input
          type="number"
          value={dato2}
          onChange={(e) => setDato2(e.target.value)}
        />
      </div>

      <div>
        <label>Operación:</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="Suma">Suma</option>
          <option value="Resta">Resta</option>
        </select>
      </div>
      <div>
        <label>Intervalo de tiempo (ms):</label>
          <input
            type="number"
            value={intervalTime}
            onChange={(e) => setIntervalTime(parseInt(e.target.value))}
          />
      </div>

      <div>
        <button onClick={handleStartCycle}>Iniciar Ciclo</button>
        <button onClick={handleStepCycle}>Ejecutar Paso a Paso</button>
        <button onClick={pauseCycle}>Pausar Ciclo</button>
        <button onClick={resumeCycle}>Reanudar Ciclo</button>
      </div>
    </div>
  );
}

export default ControlPanel;
