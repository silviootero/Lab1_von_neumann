class CPU {
    constructor() {
      this.accumulator = 0;
      this.instructionPointer = 0;
    }
  
    execute(memory) {
      const instruction = memory.fetchInstruction(this.instructionPointer);
      switch (instruction.instruction) {
        case 'LOAD':
          this.accumulator = memory.read(instruction.address);
          break;
        case 'ADD':
          this.accumulator += memory.read(instruction.address);
          break;
        case 'STORE':
          memory.write(instruction.address, this.accumulator);
          break;
        default:
          throw new Error('Unknown instruction');
      }
      this.instructionPointer++;
    }
  
    get state() {
      return {
        accumulator: this.accumulator,
        instructionPointer: this.instructionPointer,
      };
    }
  }
  
  module.exports = CPU;
  