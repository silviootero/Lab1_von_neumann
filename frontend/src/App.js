import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import CPUView from './components/CPUView';
import MemoryView from './components/MemoryView';
import UnidadDeControl from './components/UnidadDeControl';
import Arrow from './components/Arrow';  
import './App.css';

function App() {

  const [operation, setOperation] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [cpuState, setCpuState] = useState({});
  const [memory, setMemory] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1000); // Tiempo entre pasos automáticos

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

  // Cargar el programa y ejecutar el ciclo continuo
  const loadProgram = async (intervalTime = 1000) => {
    try {
      const response = await fetch('http://localhost:3001/api/start-cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intervalTime }),
      });
      const data = await response.json();
      setMemory(data.memory);  // Actualizar memoria
      setCpuState(data.registers);  // Actualizar estado de la CPU
      setOperation(data.operation);  // Actualizar operación
      setIsFinished(data.finished);  // Estado si ha terminado el ciclo
    } catch (error) {
      console.error('Error al cargar el programa:', error);
    }
  };
  

  // Ejecutar paso a paso el ciclo
  const executeStep = async () => {
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

  const pauseCycle = async () => {
    try {
      await fetch('http://localhost:3001/api/pause-cycle', { method: 'POST' });
      setIsPaused(true);
    } catch (error) {
      console.error('Error al pausar el ciclo:', error);
    }
  };

  const resumeCycle = async () => {
    try {
      await fetch('http://localhost:3001/api/resume-cycle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ intervalTime }),
      });
      setIsPaused(false);
    } catch (error) {
      console.error('Error al reanudar el ciclo:', error);
    }
  };

  const resetCycle = async () => {
    try {
      await fetch('http://localhost:3001/api/reset', { method: 'POST' });
      setCpuState({});
      setMemory([]);
    } catch (error) {
      console.error('Error al reiniciar la CPU:', error);
    }
  };

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/memory-status');
        const data = await response.json();
        setMemory(data.memory); // Asegúrate de que 'data.memory' es la forma correcta de acceder a la memoria
      } catch (error) {
        console.error('Error al obtener la memoria:', error);
      }
    };
    fetchMemory();
  }, []);
  

  return (
    <div className="App">
      <h1>Simulador Von Neumann</h1>
      <div className="container">
        <div className="ControlPanel">
          <ControlPanel
            fillMemory={fillMemory} 
            loadProgram={loadProgram} 
            executeStep={executeStep} 
            pauseCycle={pauseCycle} 
            resumeCycle={resumeCycle}
            resetCycle={resetCycle}
          />
        </div>
        <div className="views">
          <div className="top-row">
            <div className="view-container">
              <UnidadDeControl cpuState={cpuState} />
            </div>
            <div className="view-container">
              <CPUView cpuState={cpuState} />
            </div>
          </div>
          <div className="view-container">
            <MemoryView 
              memory={memory} 
              addressRegister={cpuState.addresRegister} 
              dataRegister={cpuState.dataRegister} 
            />
          </div>
          <Arrow x1={550} y1={230} x2={550} y2={330} />
          <Arrow x1={580} y1={342} x2={700} y2={240} />
          <Arrow x1={305} y1={230} x2={305} y2={330} />
          <Arrow x1={185} y1={230} x2={270} y2={330} />
        </div>
      </div>
    </div>
  );
}

export default App;
