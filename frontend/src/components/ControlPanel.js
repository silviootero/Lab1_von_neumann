import React from 'react';

function ControlPanel({ loadProgram, executeStep }) {
  const handleLoadProgram = () => {
    const exampleProgram = [
      { instruction: 'LOAD', address: 1 },
      { instruction: 'ADD', address: 2 },
      { instruction: 'STORE', address: 3 },
    ];
    loadProgram(exampleProgram);
  };

  return (
    <div>
      <button onClick={handleLoadProgram}>Load Program</button>
      <button onClick={executeStep}>Execute Step</button>
    </div>
  );
}

export default ControlPanel;
