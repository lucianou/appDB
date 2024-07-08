const express = require('express');
const app = express();

// Ruta para la página de index
app.get('/', (req, res) => {
  // Redirige al usuario a la página de login
    res.redirect('/login');
});

loginRender = require('./routes/login')
// Ruta para la página de login (por ejemplo)
app.get('/login', (req, res) => {
    res.render(loginRender);
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
