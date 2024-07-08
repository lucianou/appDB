import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';
import loginRoute from './routes/login.js';
import mainRoute from './routes/main.js';
import citasRoute from './routes/citas.js'; // Importa la ruta para citas
import serviciosRoute from './routes/servicios.js'; // Importa la ruta para servicios
import clientesRoute from './routes/clientes.js'; // Importa la ruta para clientes
import trabajadoresRoute from './routes/trabajadores.js'; // Importa la ruta para trabajadores
import bodyParser from 'body-parser';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

// Rutas principales
app.use('/', indexRoutes);
app.use('/login', loginRoute);
app.use('/main', mainRoute);

// Rutas específicas
app.use('/citas', citasRoute);
app.use('/servicios', serviciosRoute);
app.use('/clientes', clientesRoute);
app.use('/trabajadores', trabajadoresRoute);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
