import React from 'react';

function App() {
  const runCpuCycle = async () => {
    await fetch('http://localhost:3001/run');
    alert('CPU cycle executed');
  };

  return (
    <div className="App">
      <h1>Von Neumann Simulator</h1>
      <button onClick={runCpuCycle}>Run CPU Cycle</button>
    </div>
  );
}

export default App;
