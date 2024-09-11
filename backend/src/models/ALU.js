class ALU {
    // Operaciones directamente con números
    static add(a, b) {
      const aBinary = parseInt(a, 2);  // Convertir el número binario string a decimal
      const bBinary = parseInt(b, 2);  // Convertir el número binario string a decimal
      const result = aBinary + bBinary;
      return result.toString(2).padStart(8, '0');  // Convertir el resultado de vuelta a binario
    }
  
    static subtract(a, b) {
      const aBinary = parseInt(a, 2);  // Convertir el número binario string a decimal
      const bBinary = parseInt(b, 2);  // Convertir el número binario string a decimal
      const result = aBinary - bBinary;
      return result.toString(2).padStart(8, '0');  // Convertir el resultado de vuelta a binario
    }
  
    static and(a, b) {
      const aBinary = parseInt(a, 2);  // Convertir el número binario string a decimal
      const bBinary = parseInt(b, 2);  // Convertir el número binario string a decimal
      const result = aBinary & bBinary;
      return result.toString(2).padStart(8, '0');  // Convertir el resultado de vuelta a binario
    }
  
    static or(a, b) {
      const aBinary = parseInt(a, 2);  // Convertir el número binario string a decimal
      const bBinary = parseInt(b, 2);  // Convertir el número binario string a decimal
      const result = aBinary | bBinary;
      return result.toString(2).padStart(8, '0');  // Convertir el resultado de vuelta a binario
    }
  
    // Otras operaciones aritméticas y lógicas...
  }
  
  module.exports = ALU;
  
