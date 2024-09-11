import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import CPUView from './components/CPUView';
import MemoryView from './components/MemoryView';

function App() {
  const [cpuState, setCpuState] = useState({});
  const [memory, setMemory] = useState([]);
  const [operation, setOperation] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  // Función para llenar la memoria
  const fillMemory = async (operation, dato1, dato2) => {
    await fetch('http://localhost:3001/api/fill-memory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ operation, dato1, dato2 }),
    });
    fetchMemory();  // Actualizar la memoria después de llenarla
  };

  const startCycle = async (intervalTime = 1000) => {
    const response = await fetch('http://localhost:3001/api/start-cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intervalTime }), // Pasar el tiempo de intervalo
    });
    const data = await response.json();
    setCpuState(data.registers);
    setOperation(data.operation);
    setIsFinished(data.finished);
  };

  const pauseCycle = async () => {
    await fetch('http://localhost:3001/api/pause-cycle', {
        method: 'POST',
    });
  };

  const resumeCycle = async (intervalTime = 1000) => {
    const response = await fetch('http://localhost:3001/api/resume-cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intervalTime }), // Pasar el tiempo de intervalo
    });
    const data = await response.json();
    setCpuState(data.registers);
    setOperation(data.operation);
    setIsFinished(data.finished);
  };
  // Función para ejecutar el ciclo paso a paso
  const stepCycle = async () => {
    const response = await fetch('http://localhost:3001/api/run-step-by-step');
    const data = await response.json();
    setCpuState(data.registers);
    setOperation(data.operation);
    setIsFinished(data.finished);
  };

  // Función para obtener el estado de la memoria
  const fetchMemory = async () => {
    const response = await fetch('http://localhost:3001/api/memory-status');
    const data = await response.json();
    setMemory(data);
  };

  useEffect(() => {
    fetchMemory();  // Obtener el estado inicial de la memoria
  }, []);

  return (
    <div className="App">
      <h1>Simulador Arquitectura von Neumann</h1>

      <ControlPanel
        fillMemory={fillMemory}
        startCycle={startCycle}
        stepCycle={stepCycle}
        pauseCycle={pauseCycle}
        resumeCycle={resumeCycle}
      />

      <CPUView cpuState={cpuState} operation={operation} />
      <MemoryView memory={memory} />
    </div>
  );
}

export default App;