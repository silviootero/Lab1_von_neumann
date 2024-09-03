class Memory {
  constructor(size = 256) {
      this.memory = new Array(size).fill(0);
  }

  get(address) {
      return this.memory[address];
  }

  set(address, value) {
      this.memory[address] = value;
  }
}

module.exports = Memory;
