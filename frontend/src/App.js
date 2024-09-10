import React, { useState, useEffect } from 'react';

function App() {
  const [cpuState, setCpuState] = useState({});
  const [memory, setMemory] = useState([]);  // Inicializar memory como un array vacío
  const [operation, setOperation] = useState(null);
  const [dato1, setDato1] = useState(0);
  const [dato2, setDato2] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const fetchCpuState = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/cpu-status');
      const data = await response.json();
      setCpuState(data.registers);
      setMemory(data.memory || []);  // Asegurar que memory sea un array
      setIsFinished(data.finished);
      setOperation(data.operation);
    } catch (error) {
      console.error('Error fetching CPU state:', error);
    }
  };

  const pauseCycle = async () => {
    await fetch('http://localhost:3001/api/pause-cycle', { method: 'POST' });
    console.log('Ciclo pausado');
  };

  const resumeCycle = async () => {
    await fetch('http://localhost:3001/api/resume-cycle', { method: 'POST' });
    console.log('Ciclo reanudado');
  };

  // Enviar la operación seleccionada y los datos al backend para llenar la memoria
  const fillMemory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/fill-memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation, dato1, dato2 }),
      });

      const data = await response.json();
      console.log(data.message);

      // Actualizar el estado de la CPU y la memoria después de llenar la memoria
      fetchCpuState();
    } catch (error) {
      console.error('Error filling memory:', error);
    }
  };

  useEffect(() => {
    if (!isFinished) {
      const interval = setInterval(() => {
        fetchCpuState();
      }, 1000); // Actualiza cada segundo

      return () => clearInterval(interval);
    }
  }, [isFinished]);

  return (
    <div className="App">
      <h1>Von Neumann Simulator</h1>

      <div>
        <h3>Selecciona la operación para llenar la memoria</h3>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="Suma">Suma</option>
          <option value="Resta">Resta</option>
          <option value="Multiplicación">Multiplicación</option>
        </select>
        <div>
          <input
            type="number"
            placeholder="Ingrese dato 1"
            value={dato1}
            onChange={(e) => setDato1(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Ingrese dato 2"
            value={dato2}
            onChange={(e) => setDato2(Number(e.target.value))}
          />
        </div>
        <button onClick={fillMemory}>Llenar Memoria</button>
      </div>
      <div>
        <button onClick={() => fetchCpuState('run-cycle')}>Iniciar Ciclo</button>
        <button onClick={pauseCycle}>Pausar Ciclo</button>
        <button onClick={resumeCycle}>Reanudar Ciclo</button>
      </div>
      <div>
        <h3>Estado de la CPU</h3>
        <pre>{JSON.stringify(cpuState, null, 2)}</pre>
        <p>{operation ? `Operación actual: ${operation}` : 'No hay operación'}</p>
      </div>

      <div>
        <h3>Estado de la Memoria</h3>
        <table border="1">
          <tbody>
            {/* Asegurarse de que memory sea un array antes de usar .map() */}
            {Array.isArray(memory) && memory.length > 0 ? (
              memory.map((value, index) => (
                <tr key={index}>
                  <td>{value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;