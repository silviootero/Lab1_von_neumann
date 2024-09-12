import React from 'react'; // Importa React para poder usar JSX y crear componentes.
import '../ComponentStyles.css'; // Importa los estilos CSS específicos para los componentes.

// Componente funcional CPUView para mostrar el estado de la Unidad Aritmético-Lógica (ALU) de la CPU.
// Recibe como prop el estado de la CPU (cpuState) y muestra los valores de los registros clave.
const CPUView = ({ cpuState }) => {
  return (
    <div className="component-container">
      <h3>ALU</h3> {/* Título que indica que esta vista corresponde a la ALU */}
      <div className="square"> {/* Contenedor principal que representa la ALU */}
        <div className="small-squares-container">
          {/* Contenedor para organizar los registros en la vista */}
          <div className="square-label">
            <p className="label-text">Reg. Entrada</p> {/* Etiqueta para el registro de entrada */}
            <div className="small-square">{cpuState.inRegister}</div> 
            {/* Muestra el valor del registro de entrada (inRegister) de la CPU */}
          </div>
          <div className="square-label">
            <p className="label-text">Acumulador</p> {/* Etiqueta para el acumulador */}
            <div className="small-square">{cpuState.accumulator}</div> 
            {/* Muestra el valor del acumulador (accumulator) de la CPU */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPUView;

