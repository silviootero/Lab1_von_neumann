import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado del componente.
import '../ComponentStyles.css'; // Importa los estilos específicos para los componentes.

// Componente funcional ControlPanel que maneja la interacción del usuario para controlar la simulación.
// Recibe varias funciones como props para manejar las operaciones de la simulación.
function ControlPanel({ fillMemory, loadProgram, executeStep, pauseCycle, resumeCycle, resetCycle }) {
  // Estados locales para manejar los datos ingresados, la operación seleccionada, el intervalo de tiempo, y errores.
  const [dato1, setDato1] = useState('');
  const [dato2, setDato2] = useState('');
  const [operation, setOperation] = useState('Suma');
  const [intervalTime, setIntervalTime] = useState(1000); // Intervalo de tiempo en milisegundos para los ciclos automáticos.
  const [error, setError] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  
  // Opciones disponibles para las operaciones aritméticas.
  const [options] = useState([
    { label: 'Suma', value: 'Suma' },
    { label: 'Resta', value: 'Resta' },
    { label: 'Multiplicación', value: 'Multiplicación' },
    { label: 'Exponente', value: 'Exponente' },
  ]);

  // Función para validar que los datos ingresados no excedan el límite de 255.
  const validateInput = () => {
    if (parseInt(dato1) > 255 || parseInt(dato2) > 255) {
      setError('Los valores no deben superar los 255'); // Muestra un mensaje de error si alguno de los valores es mayor a 255.
      return false; // Devuelve falso si la validación falla.
    }
    setError(''); // Limpia el error si la validación es exitosa.
    return true; // Devuelve verdadero si la validación es exitosa.
  };

  // Maneja el inicio del ciclo completo, validando la entrada y llenando la memoria antes de comenzar.
  const handleStartCycle = () => {
    if (!validateInput()) return; // Valida los datos antes de continuar.
    fillMemory(operation, parseInt(dato1), parseInt(dato2)); // Llama a la función para llenar la memoria con los datos y la operación seleccionada.
    loadProgram(intervalTime); // Inicia el ciclo automático con el intervalo de tiempo especificado.
  };

  // Maneja la ejecución del ciclo paso a paso.
  const handleStepCycle = () => {
    if (!validateInput()) return; // Valida los datos antes de continuar.
    fillMemory(operation, parseInt(dato1), parseInt(dato2)); // Llama a la función para llenar la memoria.
    executeStep(); // Ejecuta un paso del ciclo.
  };

  // Maneja el cambio de operación seleccionada por el usuario.
  const handleOperationChange = (event) => {
    setOperation(event.target.value); // Actualiza la operación seleccionada.
  };

  // Maneja la pausa del ciclo.
  const handlePause = () => {
    setIsPaused(true); // Actualiza el estado para indicar que el ciclo está pausado.
    pauseCycle(); // Llama a la función para pausar el ciclo en el backend.
  };

  // Maneja la reanudación del ciclo.
  const handleResume = () => {
    setIsPaused(false); // Actualiza el estado para indicar que el ciclo ya no está pausado.
    resumeCycle(); // Llama a la función para reanudar el ciclo en el backend.
  };

  // Maneja el reinicio de la simulación.
  const handleReset = () => {
    resetCycle(); // Llama a la función para reiniciar la simulación.
  };

  // Renderiza los elementos del panel de control.
  return (
    <div>
      <div>
        {/* Campo de entrada para el primer dato */}
        <textarea
          rows="1"
          cols="10"
          placeholder="Ingrese número"
          value={dato1}
          onChange={(e) => setDato1(e.target.value)} // Actualiza el estado con el valor ingresado.
        />
      </div>
      <div>
        {/* Campo de entrada para el segundo dato */}
        <textarea
          rows="1"
          cols="10"
          placeholder="Ingrese número"
          value={dato2}
          onChange={(e) => setDato2(e.target.value)} // Actualiza el estado con el valor ingresado.
        />
      </div>
      <div>
        <label htmlFor="operaciones" className="text-center">Seleccione la operación:</label>
        <select id="sel" required onChange={handleOperationChange}> {/* Dropdown para seleccionar la operación */}
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option> // Muestra las opciones de operación disponibles.
          ))}
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra un mensaje de error si hay algún problema con la validación */}
      <div>
        {/* Botones para controlar la simulación */}
        <button onClick={handleStartCycle}>Comenzar Ciclo</button> {/* Inicia el ciclo completo */}
        <button onClick={handleStepCycle}>Paso a paso</button> {/* Ejecuta el ciclo paso a paso */}
        <button onClick={handlePause}>Pausar</button> {/* Pausa el ciclo */}
        <button onClick={handleResume}>Reanudar</button> {/* Reanuda el ciclo */}
        <button onClick={handleReset}>Reiniciar</button> {/* Reinicia la simulación */}
      </div>
      <div>
        {/* Campo para ajustar el intervalo de tiempo entre los pasos automáticos */}
        <label>Intervalo de tiempo (ms):</label>
        <input
          type="number"
          value={intervalTime}
          onChange={(e) => setIntervalTime(parseInt(e.target.value))} // Actualiza el intervalo de tiempo basado en el valor ingresado.
        />
      </div>
    </div>
  );
}

export default ControlPanel;
