import React from 'react';

// Componente funcional Arrow para dibujar una flecha en una posición específica dentro del SVG.
// Recibe las coordenadas de inicio (x1, y1) y fin (x2, y2) de la flecha, además de propiedades opcionales
// para definir el color y el grosor de la línea.
const Arrow = ({ x1, y1, x2, y2, color = 'black', strokeWidth = 2 }) => {
  return (
    <svg
      // El SVG se posiciona absolutamente para permitir la superposición en otros componentes.
      // Los eventos de puntero se desactivan para evitar que interfiera con la interacción del usuario en otros elementos.
      style={{ position: 'absolute', pointerEvents: 'none' }}
      width="100%" // Ocupa todo el ancho del contenedor padre.
      height="100%" // Ocupa todo el alto del contenedor padre.
    >
      <line
        // Define la línea de la flecha desde el punto inicial (x1, y1) al punto final (x2, y2).
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color} // Color de la línea, por defecto es negro.
        strokeWidth={strokeWidth} // Grosor de la línea, por defecto es 2.
        markerEnd="url(#arrowhead)" // Añade un marcador en el final de la línea para representar la punta de la flecha.
      />
      <defs>
        <marker
          id="arrowhead" // Define un marcador para la punta de la flecha.
          markerWidth="10" // Ancho del marcador.
          markerHeight="10" // Alto del marcador.
          refX="0" // Posición de referencia en el eje X para alinear la punta de la flecha.
          refY="3" // Posición de referencia en el eje Y para alinear la punta de la flecha.
          orient="auto" // Orientación automática de la punta de la flecha basada en la línea.
          fill={color} // Color del marcador que coincide con el color de la línea.
        >
          <polygon points="0 0, 10 3, 0 6" /> {/* Define la forma de la punta de la flecha como un pequeño triángulo. */}
        </marker>
      </defs>
    </svg>
  );
};

export default Arrow;
