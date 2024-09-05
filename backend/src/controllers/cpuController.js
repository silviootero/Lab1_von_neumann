const ALU = require('../models/ALU');
const Memory = require('../models/Memory');


class CPU {
    constructor() {
        //Se crean todos los registros con los que se trabajará
        this.registers = {
            accumulator: 0b00000000,
            programCounter: 0b0000,
            instructionsRegister: 0b00000000,
            inRegister: 0b00000000,
            addresRegister: 0b0000,
            dataRegister: 0b00000000

        };
        this.memory = new Memory();
        this.isOperating = true;
        
    }
    //EL registro de direcciones recibe la dirección y se hace el aumento del contador de programa
    getAddress(){
        this.registers.addresRegister = this.registers.programCounter,
        this.registers.programCounter++;
    }

    //La CPU toma una instrucción/dato desde la memoria.
    fetch() {
        
        const instruction = this.memory.get(this.registers.addresRegister);
        return instruction;
    }

    //Se envía el dato/instrucción al registro de datos
    getData(instruction){
        this.registers.dataRegister = instruction;
    }

    //El registro de instrucción recibe la instrucción que se guardó en el registro de datos
    getInstruction(){
        this.registers.instructionsRegister = this.registers.dataRegister;
    }

    //El registro de entrada recibe el dato que se guardó en el registro de datos
    getInData(){
        this.registers.inRegister = this.registers.dataRegister;
    }

    // Se decodifica la instrucción en operación y dirección del número a operar
    decode() {
        //Se divide el binario en dos partes para extraer la instrucción y la ubicación
        // Convertir el número binario a una cadena sin el prefijo '0b'
        let instructionString = this.registers.instructionsRegister.toString(2).padStart(8, '0');
        
        // Dividir la cadena en dos partes
        let stringOperation = instructionString.slice(0, 4);  // Operación a realizar
        let address = instructionString.slice(4);    // Ubicación del número

        const operationCodes = {
            "0000": 'ADD',
            "0001": 'SUB',
            "0010": 'MULT',
            "0011": 'EXP',
            "0110": 'MOVE',
            "0111": 'FINISH'
        };
        
        let operation = operationCodes[stringOperation]

        // Devolver un objeto con ambos valores
        return {
            address: parseInt(address, 2),  // Convertir la dirección de binario a número decimal
            operation: operation
        };
    
    }

    //Se recibe la dirección del dato que se obtiene al ejecutar decode y se envía al registro de direcciones
    getRegisterData(address){
        this.registers.addresRegister = address;

    }

    //Se guarda el dato del acumulador en la memoria
    store(){
        this.memory.set(this.registers.addresRegister, this.registers.accumulator)
    }

    //Se ejecutan las operaciones, en el caso de las sumas o restas, el valor del acumulador se suma o resta al valor del número de registro de entrada
    execute(operation) {
        switch(operation) {
            case 'ADD':
                this.registers.accumulator = ALU.add(this.registers.accumulator, this.registers.inRegister);
                break;
            case 'SUB':
                this.registers.accumulator = ALU.subtract(this.registers.accumulator, this.registers.inRegister);
                break;
        }
    }


    // Ciclo principal de ejecución
    runCycle() {
        
        if (!this.isOperating) return;

        // Obtener la dirección de la siguiente instrucción
        this.getAddress();

        // Obtener la instrucción desde la memoria
        let instruction = this.fetch();

        //Se envía la instrucción al registro de datos
        this.getData(instruction);

        // Guardar la instrucción en el registro de instrucciones
        this.getInstruction();

        // Decodificar la instrucción
        let { operation, address } = this.decode();

        //En caso de instrucción finalizar, se termina el proceso
        if(operation == 'FINISH'){

            this.isOperating = false;
            return;
        }

        //En caso de instrucción de mover a la memoria se ejecutan los pasos para que suceda
        if(operation == 'MOVE'){

            this.getRegisterData(address)  //Se envía la dirección en la que se guardará el dato al registro de direcciones
            this.store(); //Se guarda el dato
            return;

        }
        

        //Se envía al registro de direcciones la dirección que se buscará en la memoria
        this.getRegisterData(address); 

        //Se obtiene el dato de la memoria
        let dato = this.fetch();

        //Se manda el dato a al registro de datos
        this.getData(dato);

        //Se envía el dato desde el registro de datos al registro de entrada
        this.getInData();

        //Se ejecuta la operación especificada
        this.execute(operation);
    }
}

module.exports = CPU;
