import React from 'react';

function MemoryView({ memoryState }) {
  return (
    <div>
      <h2>Memory</h2>
      <pre>{JSON.stringify(memoryState, null, 2)}</pre>
    </div>
  );
}

export default MemoryView;
