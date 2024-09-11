import React from 'react';
import '../ComponentStyles.css';

const MemoryView = ({ memory, addressRegister, dataRegister }) => {
  return (
    <div className="component-container">
      <h3>Memory</h3>
      <div className="memory-square">
        {/* Bloque Reg. Direcciones a la izquierda */}
        <div className="memory-left">
          <p>Reg. Direcciones</p>
          <div className="small-square">{addressRegister}</div> {/* Mostrar addressRegister */}
        </div>

        {/* Tabla de Memoria */}
        <table className="memory-table">
          <thead>
            <tr>
              <th>Dirección</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {memory.map((value, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bloque Reg. Datos a la derecha */}
        <div className="memory-right">
          <p>Reg. Datos</p>
          <div className="small-square">{dataRegister}</div> {/* Mostrar dataRegister */}
        </div>
      </div>
    </div>
  );
};

export default MemoryView;
