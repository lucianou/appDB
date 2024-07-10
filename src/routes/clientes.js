import { Router } from 'express';
import { pool } from './../database/connectionPostgreSQL.js';

const router = Router();

// Función para obtener los clientes y peluqueros de la base de datos
const getClientesYPeluqueros = async () => {
  try {
    const clientesResult = await pool.query('SELECT nombre, rut FROM empleado;');
    const peluquerosResult = await pool.query('SELECT nombre, rut FROM empleado;');
    return {
      clientes: clientesResult.rows,
      peluqueros: peluquerosResult.rows
    };
  } catch (error) {
    console.error('Error al obtener los clientes y peluqueros:', error);
    return { clientes: [], peluqueros: [] };
  }
};

// Ruta para la página de citas (GET)
router.get('/', async (req, res) => {
  const { clientes, peluqueros } = await getClientesYPeluqueros();
  res.render('clientes', { clientes, peluqueros }); // Renderizar el archivo de vista citas.ejs con la lista de clientes y peluqueros
});

// Ruta para manejar la selección del cliente, peluquero, fecha y hora (POST)
router.post('/', async (req, res) => {
  const { clienteSeleccionado, peluqueroSeleccionado, fechaSeleccionada, horaSeleccionada } = req.body;
  const [nombreCliente, rutCliente] = clienteSeleccionado.split(' - ');
  const [nombrepeluquero, rutPeluquero] = peluqueroSeleccionado.split(' - ');

  
  try {
    // Inserción en la base de datos
    await pool.query('INSERT INTO citas (rut_cliente, rut_peluquero, fecha, hora) VALUES ($1, $2, $3, $4)', 
      [rutCliente, peluqueroSeleccionado, fechaSeleccionada, horaSeleccionada]);
    res.send(`Cita agendada para el cliente: ${nombreCliente}, RUT: ${rutCliente}, con el peluquero: ${peluqueroSeleccionado}, en la fecha: ${fechaSeleccionada} a las: ${horaSeleccionada}`);
  } catch (error) {
    console.error('Error al agendar la cita:', error);
    res.status(500).send('Error al agendar la cita');
  }
});

export default router;