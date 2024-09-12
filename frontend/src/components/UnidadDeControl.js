import React from 'react'; // Importa React para usar JSX y componentes.
import '../ComponentStyles.css'; // Importa los estilos específicos para los componentes.

// Componente funcional UnidadDeControl que muestra visualmente el estado de la Unidad de Control de la CPU.
// Recibe `cpuState` como prop, que contiene los valores actuales de varios registros de la CPU.
const UnidadDeControl = ({ cpuState }) => {
  return (
    <div className="component-container">
      <h3>Unidad de Control</h3> {/* Título de la sección que indica que se está mostrando la Unidad de Control */}
      <div className="square"> {/* Contenedor principal con estilo cuadrado que engloba los registros de la unidad de control */}
        <div className="small-squares-container">
          
          {/* Bloque para mostrar el decodificador (operación actual) */}
          <div className="square-label">
            <div className="small-square">{cpuState.operation}</div> {/* Muestra la operación actual decodificada */}
            <p className="label-text">Decodificador</p> {/* Etiqueta para el decodificador */}
          </div>

          {/* Bloque para mostrar el registro de instrucciones */}
          <div className="square-label">
            <div className="small-square">{cpuState.instructionsRegister}</div> {/* Muestra el valor del registro de instrucciones */}
            <p className="label-text">Reg. Instrucciones</p> {/* Etiqueta para el registro de instrucciones */}
          </div>

          {/* Bloque para mostrar el contador de programa */}
          <div className="square-label">
            <div className="small-square">{cpuState.programCounter}</div> {/* Muestra el valor del contador de programa */}
            <p className="label-text">Cont. Programa</p> {/* Etiqueta para el contador de programa */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnidadDeControl;
