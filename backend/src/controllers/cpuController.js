const CPU = require('../models/CPU');
const Memory = require('../models/Memory');

let cpu = new CPU();
let memory = new Memory();

const loadProgram = (req, res) => {
  const program = req.body.program;
  memory.loadProgram(program);
  res.json({ message: 'Program loaded', memory: memory.state });
};

const executeStep = (req, res) => {
  cpu.execute(memory);
  res.json({ cpu: cpu.state, memory: memory.state });
};

module.exports = { loadProgram, executeStep };
