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
        this.paused = false;  // Estado de pausa
        
    }
    // Método para pausar la CPU
    pause() {
        this.paused = true;
    }

    // Método para reanudar la CPU
    resume() {
        this.paused = false;
        this.runCycle(this.updateCallback);  // Continuar el ciclo
    }

    // Verificar si la CPU está pausada
    checkPaused(updateCallback) {
        if (this.paused) {
            updateCallback(this.registers, null, false);  // Enviar actualización indicando que está pausada
            return true;  // Pausada
        }
        return false;  // No está pausada
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
    runCycle(updateCallback) {
        
        this.updateCallback = updateCallback;  // Guardar el callback

        if (!this.isOperating) {
            updateCallback(this.registers, null, true);  // No continuar si está pausada o terminada
            return;
        }

        if (this.checkPaused(updateCallback)) return;
        // Obtener la dirección de la siguiente instrucción
        this.getAddress();
        updateCallback(this.registers, null, false);


        if (this.checkPaused(updateCallback)) return;
        // Obtener la instrucción desde la memoria
        let instruction = this.fetch();


        if (this.checkPaused(updateCallback)) return;
        //Se envía la instrucción al registro de datos
        this.getData(instruction);
        updateCallback(this.registers, null, false);


        if (this.checkPaused(updateCallback)) return;
        // Guardar la instrucción en el registro de instrucciones
        this.getInstruction();
        updateCallback(this.registers, null, false);

        if (this.checkPaused(updateCallback)) return;
        // Decodificar la instrucción
        let { operation, address } = this.decode();

        //En caso de instrucción finalizar, se termina el proceso
        if(operation == 'FINISH'){

            if (this.checkPaused(updateCallback)) return;
            this.isOperating = false;
            updateCallback(this.registers, operation, true);  // Enviar actualización final
            return;
        }

        //En caso de instrucción de mover a la memoria se ejecutan los pasos para que suceda
        if(operation == 'MOVE'){

            if (this.checkPaused(updateCallback)) return;
            this.getRegisterData(address)  //Se envía la dirección en la que se guardará el dato al registro de direcciones
            updateCallback(this.registers, operation, false);

            if (this.checkPaused(updateCallback)) return;
            this.store(); //Se guarda el dato
            updateCallback(this.registers, operation, false);
            return;

        }
        

        if (this.checkPaused(updateCallback)) return;
        //Se envía al registro de direcciones la dirección que se buscará en la memoria
        this.getRegisterData(address);
        updateCallback(this.registers, operation, false);


        if (this.checkPaused(updateCallback)) return;
        //Se obtiene el dato de la memoria
        let dato = this.fetch();


        if (this.checkPaused(updateCallback)) return;
        //Se manda el dato a al registro de datos
        this.getData(dato);
        updateCallback(this.registers, operation, false);


        if (this.checkPaused(updateCallback)) return;
        //Se envía el dato desde el registro de datos al registro de entrada
        this.getInData();
        updateCallback(this.registers, operation, false);


        if (this.checkPaused(updateCallback)) return;
        //Se ejecuta la operación especificada
        this.execute(operation);
        updateCallback(this.registers, operation, false);



         // Retrasar el siguiente ciclo si no está pausado
        if (!this.paused) {
            setTimeout(() => this.runCycle(updateCallback), 1000);  // 1 segundo de retraso
        }
    }
}

module.exports = CPU;
