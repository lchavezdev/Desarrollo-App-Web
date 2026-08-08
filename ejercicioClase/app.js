const express = require('express');
const app = express();
const PORT = 3000;

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
