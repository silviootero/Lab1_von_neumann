import React from 'react';
import '../ComponentStyles.css';

const CPUView = ({ cpuState }) => {
  return (
    <div className="component-container">
      <h3>ALU</h3>
      <div className="square">
        <div className="small-squares-container">
          <div className="square-label">
            <p className="label-text">Reg. Entrada</p>
            <div className="small-square">{cpuState.inRegister}</div> {/* Mostrar inRegister */}
          </div>
          <div className="square-label">
            <p className="label-text">Acumulador</p>
            <div className="small-square">{cpuState.accumulator}</div> {/* Mostrar accumulator */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPUView;
