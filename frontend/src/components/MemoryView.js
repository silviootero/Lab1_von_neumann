import React from 'react'; // Importa React para el uso de JSX y componentes.
import '../ComponentStyles.css'; // Importa los estilos específicos para los componentes.

// Componente funcional MemoryView que muestra visualmente el estado de la memoria y registros relacionados.
// Recibe `memory`, `addressRegister`, y `dataRegister` como props para mostrar el estado actual de la memoria y los registros.
const MemoryView = ({ memory, addressRegister, dataRegister }) => {
  return (
    <div className="component-container">
      <h3>Memory</h3> {/* Título de la sección que indica que se está mostrando la memoria */}
      <div className="memory-square"> {/* Contenedor principal que organiza los registros y la tabla de memoria */}

        {/* Bloque de Reg. Direcciones a la izquierda */}
        <div className="memory-left">
          <p>Reg. Direcciones</p> {/* Etiqueta del registro de direcciones */}
          <div className="small-square">{addressRegister}</div> {/* Muestra el valor actual del registro de direcciones */}
        </div>

        {/* Tabla de Memoria */}
        <table className="memory-table">
          <thead>
            <tr>
              <th>Dirección</th> {/* Encabezado para la columna de direcciones de memoria */}
              <th>Valor</th> {/* Encabezado para la columna de valores de memoria */}
            </tr>
          </thead>
          <tbody>
            {/* Mapea el contenido de la memoria, mostrando cada dirección con su valor correspondiente */}
            {memory.map((value, index) => (
              <tr key={index}>
                <td>{index}</td> {/* Muestra la dirección de memoria (índice) */}
                <td>{value}</td> {/* Muestra el valor almacenado en esa dirección */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bloque de Reg. Datos a la derecha */}
        <div className="memory-right">
          <p>Reg. Datos</p> {/* Etiqueta del registro de datos */}
          <div className="small-square">{dataRegister}</div> {/* Muestra el valor actual del registro de datos */}
        </div>
      </div>
    </div>
  );
};

export default MemoryView;
