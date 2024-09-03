const ALU = require('../models/ALU');
const Memory = require('../models/Memory');

class CPU {
    constructor() {
        this.registers = {
            accumulator: 0,
            programCounter: 0,
            // Otros registros...
        };
        this.memory = new Memory();
    }

    fetch() {
        const instruction = this.memory.get(this.registers.programCounter);
        this.registers.programCounter++;
        return instruction;
    }

    decode(instruction) {
        // Decodifica la instrucción en operación y operandos...
    }

    execute(operation, operand1, operand2) {
        switch(operation) {
            case 'ADD':
                this.registers.accumulator = ALU.add(operand1, operand2);
                break;
            case 'SUB':
                this.registers.accumulator = ALU.subtract(operand1, operand2);
                break;
            // Otras operaciones...
        }
    }

    runCycle() {
        const instruction = this.fetch();
        const { operation, operand1, operand2 } = this.decode(instruction);
        this.execute(operation, operand1, operand2);
    }
}

module.exports = CPU;
