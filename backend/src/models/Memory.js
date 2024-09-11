class Memory {
    constructor(size = 10) {
        this.memory = new Array(size).fill("00000000");
    }
  
    get(address) {

        return this.memory[address];
    }
  
    set(address, value) {

        this.memory[address] = value.toString(2).padStart(8, '0');
    }
  
    // Función para llenar la memoria con datos específicos según la operación
    fillWithOperationData(operation, dato1, dato2) {
        const binario1 = dato1.toString(2).padStart(8, '0');
        const binario2 = dato2.toString(2).padStart(8, '0');

        switch (operation) {
            case 'Suma':
                this.set(0, "00000100"); 
                this.set(1, "00000101");
                this.set(2, "01100110");
                this.set(3, "01110000");
                this.set(4, binario1);
                this.set(5, binario2);
                break;
            case 'Resta':
                this.set(0, "00000100"); 
                this.set(1, "00010101");
                this.set(2, "01100110");
                this.set(3, "01110000");
                this.set(4, binario1);
                this.set(5, binario2);
                break;
            default:
                throw new Error('Operación no válida');
        }
    }
  }
  
  module.exports = Memory;
  