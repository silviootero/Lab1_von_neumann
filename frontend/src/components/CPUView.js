import React from 'react';

function CPUView({ cpuState }) {
  return (
    <div>
      <h2>CPU</h2>
      <pre>{JSON.stringify(cpuState, null, 2)}</pre>
    </div>
  );
}

export default CPUView;
