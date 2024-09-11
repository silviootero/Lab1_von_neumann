import React from 'react';

function CPUView({ cpuState, operation }) {
  return (
    <div className="cpu-view">
      <h2>Estado de la CPU</h2>
      <pre>{JSON.stringify(cpuState, null, 2)}</pre>
      <p>Operación decodificada: {operation || 'Ninguna'}</p>
    </div>
  );
}

export default CPUView;
