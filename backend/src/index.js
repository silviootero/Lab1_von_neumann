const express = require('express');
const cors = require('cors');  // CORS para permitir que el frontend se conecte al backend
const apiRoutes = require('./routes/api');  // Importar las rutas de la API

const app = express();

// Middleware
app.use(cors());  // Permitir solicitudes de diferentes dominios (útil para desarrollo con frontend separado)
app.use(express.json());  // Habilitar el manejo de JSON en el cuerpo de las solicitudes

// Rutas
app.use('/api', apiRoutes);

// Configurar el puerto del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
