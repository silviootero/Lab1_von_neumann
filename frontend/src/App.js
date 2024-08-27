import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import MemoryView from './components/MemoryView';
import CPUView from './components/CPUView';

function App() {
  const [program, setProgram] = useState([]);
  const [cpuState, setCpuState] = useState({});
  const [memoryState, setMemoryState] = useState([]);

  const loadProgram = (program) => {
    fetch('/api/load-program', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ program }),
    })
    .then(response => response.json())
    .then(data => setMemoryState(data.memory));
  };
  
  const executeStep = () => {
    fetch('/api/execute-step', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      setCpuState(data.cpu);
      setMemoryState(data.memory);
    });
  };  

  return (
    <div className="App">
      <h1>Von Neumann Architecture Simulator</h1>
      <ControlPanel loadProgram={loadProgram} executeStep={executeStep} />
      <MemoryView memoryState={memoryState} />
      <CPUView cpuState={cpuState} />
    </div>
  );
}


export default App;
