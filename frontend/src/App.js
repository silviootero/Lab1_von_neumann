import React, { useState, useEffect } from 'react'; // Importa React y hooks para manejar estado y efectos secundarios.
import ControlPanel from './components/ControlPanel'; // Importa el componente del panel de control.
import CPUView from './components/CPUView'; // Importa la vista de la CPU.
import MemoryView from './components/MemoryView'; // Importa la vista de la memoria.
import UnidadDeControl from './components/UnidadDeControl'; // Importa la unidad de control.
import Arrow from './components/Arrow'; // Importa el componente para dibujar flechas de conexión.
import './App.css'; // Importa los estilos CSS para la aplicación.

// Componente principal de la aplicación.
function App() {

  // Estados locales para manejar la operación actual, si el ciclo ha terminado, el estado de la CPU, la memoria, si el ciclo está pausado, y el tiempo de intervalo entre pasos.
  const [operation, setOperation] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [cpuState, setCpuState] = useState({});
  const [memory, setMemory] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1000); // Tiempo en milisegundos entre los pasos automáticos.

  // Función para llenar la memoria con datos y operación especificada.
  const fillMemory = async (operation, dato1, dato2) => {
    await fetch('http://localhost:3001/api/fill-memory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ operation, dato1, dato2 }), // Envía los datos y la operación al backend para llenar la memoria.
    });
    fetchMemory(); // Actualiza el estado de la memoria después de llenarla.
  };

  // Función para cargar el programa y comenzar el ciclo continuo.
  const loadProgram = async (intervalTime = 1000) => {
    try {
      const response = await fetch('http://localhost:3001/api/start-cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intervalTime }), // Envía el tiempo de intervalo para los pasos automáticos.
      });
      const data = await response.json();
      setMemory(data.memory); // Actualiza la memoria con los datos recibidos.
      setCpuState(data.registers); // Actualiza el estado de los registros de la CPU.
      setOperation(data.operation); // Actualiza la operación actual.
      setIsFinished(data.finished); // Establece si el ciclo ha terminado.
    } catch (error) {
      console.error('Error al cargar el programa:', error); // Manejo de errores al cargar el programa.
    }
  };

  // Función para ejecutar el ciclo paso a paso.
  const executeStep = async () => {
    const response = await fetch('http://localhost:3001/api/run-step-by-step'); // Solicita al backend ejecutar un paso.
    const data = await response.json();
    setCpuState(data.registers); // Actualiza los registros de la CPU con los nuevos valores.
    setOperation(data.operation); // Actualiza la operación actual.
    setIsFinished(data.finished); // Actualiza si el ciclo ha finalizado.
  };

  // Función para obtener el estado actual de la memoria desde el backend.
  const fetchMemory = async () => {
    const response = await fetch('http://localhost:3001/api/memory-status');
    const data = await response.json();
    setMemory(data); // Actualiza la memoria con los datos obtenidos del backend.
  };

  // Función para pausar el ciclo de ejecución.
  const pauseCycle = async () => {
    try {
      await fetch('http://localhost:3001/api/pause-cycle', { method: 'POST' });
      setIsPaused(true); // Cambia el estado a pausado.
    } catch (error) {
      console.error('Error al pausar el ciclo:', error); // Manejo de errores al pausar.
    }
  };

  // Función para reanudar el ciclo de ejecución después de haberlo pausado.
  const resumeCycle = async () => {
    try {
      await fetch('http://localhost:3001/api/resume-cycle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ intervalTime }), // Envía el tiempo de intervalo para continuar con los pasos automáticos.
      });
      setIsPaused(false); // Cambia el estado a no pausado.
    } catch (error) {
      console.error('Error al reanudar el ciclo:', error); // Manejo de errores al reanudar.
    }
  };

  // Función para reiniciar la simulación, reseteando el estado de la CPU y la memoria.
  const resetCycle = async () => {
    try {
      await fetch('http://localhost:3001/api/reset', { method: 'POST' });
      setCpuState({}); // Resetea el estado de la CPU.
      setMemory([]); // Resetea la memoria.
    } catch (error) {
      console.error('Error al reiniciar la CPU:', error); // Manejo de errores al reiniciar.
    }
  };

  // useEffect para obtener el estado inicial de la memoria al montar el componente.
  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/memory-status');
        const data = await response.json();
        setMemory(data.memory); // Actualiza el estado de la memoria con los datos iniciales.
      } catch (error) {
        console.error('Error al obtener la memoria:', error); // Manejo de errores al obtener la memoria.
      }
    };
    fetchMemory();
  }, []); // Ejecuta solo una vez al montar el componente.

  // Renderizado del componente principal, incluyendo el panel de control, las vistas de CPU, memoria y las conexiones visuales con flechas.
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
              <UnidadDeControl cpuState={cpuState} /> {/* Vista de la unidad de control, pasando el estado de la CPU como props */}
            </div>
            <div className="view-container">
              <CPUView cpuState={cpuState} /> {/* Vista de la CPU, pasando el estado de la CPU como props */}
            </div>
          </div>
          <div className="view-container">
            <MemoryView 
              memory={memory} 
              addressRegister={cpuState.addresRegister} 
              dataRegister={cpuState.dataRegister} 
            /> {/* Vista de la memoria, pasando la memoria y registros como props */}
          </div>
          {/* Componentes de flechas para visualización de conexiones */}
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
