import React from 'react'; // Importa la librería React para utilizar JSX y componentes.
import ReactDOM from 'react-dom'; // Importa ReactDOM para manipular el DOM de la página.
import App from './App'; // Importa el componente principal de la aplicación.

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* Renderiza el componente principal `App` dentro del DOM. */}
  </React.StrictMode>,
  document.getElementById('root') // Selecciona el elemento HTML con el id 'root' como punto de montaje para la aplicación.
);

