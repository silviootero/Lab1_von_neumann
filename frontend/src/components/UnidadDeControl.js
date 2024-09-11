import React from 'react';
import '../ComponentStyles.css';

const UnidadDeControl = ({ cpuState }) => {
  return (
    <div className="component-container">
      <h3>Unidad de Control</h3>
      <div className="square">
        <div className="small-squares-container">
          <div className="square-label">
            <div className="small-square">{cpuState.operation}</div> {/* Mostrar operación (decodificador) */}
            <p className="label-text">Decodificador</p>
          </div>
          <div className="square-label">
            <div className="small-square">{cpuState.instructionsRegister}</div> {/* Mostrar instructionRegister */}
            <p className="label-text">Reg. Instrucciones</p>
          </div>
          <div className="square-label">
            <div className="small-square">{cpuState.programCounter}</div> {/* Mostrar programCounter */}
            <p className="label-text">Cont. Programa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnidadDeControl;
