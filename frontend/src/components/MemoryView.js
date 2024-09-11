import React from 'react';

function MemoryView({ memory }) {
  return (
    <div className="memory-view">
      <h2>Memoria (Primeras 10 celdas)</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Dirección</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {memory.slice(0, 10).map((value, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemoryView;

