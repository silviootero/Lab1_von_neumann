const ALU = require('../models/ALU');
const Memory = require('../models/Memory');


class CPU {
    constructor() {
        //Se crean todos los registros con los que se trabajará
        this.registers = {
            accumulator: "00000000",
            programCounter: 0b0000,
            instructionsRegister: null,
            inRegister: null,
            addresRegister: null,
            dataRegister: null

        };
        this.memory = new Memory();
        this.isOperating = true;
        this.currentStep = 0; // Control del paso actual
        this.operation = null;     // Instrucción actual
        this.address = null;       // Dirección actual
        this.interval = null;  // Almacenar el ID del intervalo para pausar/reanudar
        
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


    // Método para ejecutar el ciclo paso a paso automáticamente usando un timer
    runCycleWithTimer(updateCallback, intervalTime = 1000) {
        if (!this.isOperating) return;

        // Si ya hay un intervalo corriendo, detenerlo antes de iniciar uno nuevo
        if (this.interval) {
            clearInterval(this.interval);
        }

        // Iniciar un intervalo que ejecute cada paso automáticamente
        this.interval = setInterval(() => {
            this.runStepByStep(updateCallback);

            // Si el ciclo ha terminado (instrucción FINISH)
            if (!this.isOperating) {
                clearInterval(this.interval);  // Detener el timer al finalizar el ciclo
                this.interval = null;  // Reiniciar el estado del intervalo
            }
        }, intervalTime);  // Ejecutar cada paso cada 1000ms (1 segundo por defecto)
    }

    // Método para pausar el ciclo (detener el timer)
    pauseCycle() {
        if (this.interval) {
            clearInterval(this.interval);  // Detener el timer
            this.interval = null;
        }
    }

    // Método para reanudar el ciclo (reiniciar el timer)
    resumeCycle(updateCallback, intervalTime = 1000) {
        if (!this.interval && this.isOperating) {
            this.runCycleWithTimer(updateCallback, intervalTime);
        }
    }
    


    // Método para ejecutar paso a paso
    runStepByStep(updateCallback) {

        if (!this.isOperating) {
            updateCallback(this.registers, null, true);  // Si el ciclo ha terminado, no continuar
            return;
        }

        this.updateCallback = updateCallback;  // Guardar el callback

        switch (this.currentStep) {
            case 0:
                //Se envía el estado inicial al front
                updateCallback(this.registers, null, false);
                this.currentStep++;
                break;

            case 1:
                // Paso 1: Obtener la dirección de la siguiente instrucción
                this.getAddress();
                updateCallback(this.registers, null, false);
                this.currentStep++;
                break;

            case 2:
                // Paso 2: Obtener la instrucción desde la memoria
                let instruction = this.fetch();
                this.getData(instruction);
                updateCallback(this.registers, null, false);
                this.currentStep++;
                break;

            case 3:
                // Paso 3: Guardar la instrucción en el registro de instrucciones
                this.getInstruction();
                updateCallback(this.registers, null, false);
                this.currentStep++;
                break;

            case 4:
                // Paso 4: Decodificar la instrucción
                let decoded = this.decode();
                this.operation = decoded.operation;
                this.address = decoded.address;

                // Finalizar si la instrucción es FINISH
                if (this.operation === 'FINISH') {
                    this.isOperating = false;
                    updateCallback(this.registers, this.operation, true);  // Enviar actualización final
                    return;
                }
                //En caso de no ser FINISH, Ejecutar MOVE (subpasos del MOVE separados)
                if (this.operation === 'MOVE') {
                    // Subpaso 1: Enviar la dirección al registro de direcciones
                    this.getRegisterData(this.address);
                    updateCallback(this.registers, this.operation, false);
                    this.currentStep++;
                    break;
                }
                //Se envían los datos y se pasa a la siguiente, omitiendo el otro paso de MOVE
                updateCallback(this.registers, this.operation, false);
                this.currentStep = this.currentStep+2;
                break;

            case 5:
                // Subpaso 2 del MOVE: Guardar el dato en memoria
                if (this.operation === 'MOVE') {
                    this.store();  // Guardar en memoria
                    updateCallback(this.registers, this.operation, false);
                    this.currentStep = 0;  // Reiniciar el ciclo para la siguiente instrucción
                    break;
                }
                break;
                  
            // Pasos en caso de ser un número a operar
            case 6:
                //Paso  para obtener la dirección del número a operar
                this.getRegisterData(this.address);
                updateCallback(this.registers, this.operation, false);
                this.currentStep++;
                break;

            case 7:
                //Paso para obtener el número desde la memoria
                let data = this.fetch();
                this.getData(data);
                updateCallback(this.registers, this.operation, false);
                this.currentStep++;
                break;

            case 8:
                //Paso para enviar el dato al registro de entrada
                this.getInData();
                updateCallback(this.registers, this.operation, false);
                this.currentStep++;
                break;


            case 9:
                // Paso final: Ejecutar la operación aritmética
                this.execute(this.operation);
                updateCallback(this.registers, this.operation, false);

                this.currentStep = 0;  // Reiniciar el ciclo para la siguiente instrucción
                break;
        }
    }

}

module.exports = CPU;
