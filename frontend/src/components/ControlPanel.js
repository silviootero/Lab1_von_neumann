import React, { useState } from 'react';

function ControlPanel({ loadProgram, executeStep }) {
  const [minuendo, setMinuendo] = useState('');
  const [sustraendo, setSustraendo] = useState('');
  const [resultado, setResultado] = useState(null);
  const [options, setOptions] = useState([
    { label: 'Suma', value: 'Suma' },
    { label: 'Resta', value: 'Resta' },
    { label: 'Multiplicación', value: 'Multiplicación' },
    { label: 'Exponente', value: 'Exponente' },
  ]);

  const handleMinuendoChange = (event) => {
    setMinuendo(event.target.value);
  };

  const handleSustraendoChange = (event) => {
    setSustraendo(event.target.value);
  };

  const handleRestar = () => {
    const resultado = parseFloat(minuendo) - parseFloat(sustraendo);
    setResultado(resultado);
  };

  const handleLoadProgram = () => {
    const exampleProgram = [
      { instruction: 'LOAD', address: 1 },
      { instruction: 'ADD', address: 2 },
      { instruction: 'STORE', address: 3 },
    ];
    loadProgram(exampleProgram);
  };

  const addOption = (label, value) => {
    setOptions([...options, { label, value }]);
  };

  return (
    <div>
      <div>
        <textarea
          rows="1"
          cols="10"
          placeholder="Ingrese número"
          value={minuendo}
          onChange={handleMinuendoChange}
        />
      </div>
      <div>
        <textarea
          rows="1"
          cols="10"
          placeholder="Ingrese número"
          value={sustraendo}
          onChange={handleSustraendoChange}
        />
      </div>
      <div>
        <label htmlFor="operaciones" className="text-center">
          Seleccione la operación:
        </label>
        <select id="sel" required>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleRestar}>Ejecutar</button>
      </div>
      <div>
        <button onClick={handleRestar}>Paso a paso</button>
      </div>
      <div>
        {resultado !== null && <p>Resultado de la resta: {resultado}</p>}
      </div>
      <div>
        <button onClick={handleLoadProgram}>Load Program</button>
        <button onClick={executeStep}>Execute Step</button>
      </div>
    </div>
  );
}

export default ControlPanel;
