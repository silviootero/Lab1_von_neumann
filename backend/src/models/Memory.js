class Memory {
    constructor() {
      this.memory = Array(10).fill(0);
    }
  
    loadProgram(program) {
      program.forEach((instruction, index) => {
        this.memory[index] = instruction;
      });
    }
  
    fetchInstruction(index) {
      return this.memory[index];
    }
  
    read(address) {
      return this.memory[address];
    }
  
    write(address, value) {
      this.memory[address] = value;
    }
  
    get state() {
      return this.memory;
    }
  }
  
  module.exports = Memory;
  