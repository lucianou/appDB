import { Router } from 'express';
import { pool } from './../database/connectionPostgreSQL.js';

const router = Router();

// Función para obtener las comunas y los clientes de la base de datos
const getDatos = async () => {
  try {
    const servicioResult = await pool.query('SELECT id_servicio FROM servicio;');
    const salonResult = await pool.query('SELECT id_salon, nombre_salon FROM salon;');
    return {
      servicios: servicioResult.rows,
      salones: salonResult.rows
    };
  } catch (error) {
    console.error('Error al obtener las comunas y empleados:', error);
    return { servicios: [], salones: [] };
  }
};

// Ruta para la página de registro de clientes (GET)
router.get('/', async (req, res) => {
  const { servicios, salones } = await getDatos();
  res.render('servicios', { servicios , salones}); // Renderizar el archivo de vista clientes.ejs con la lista de comunas
});

// Ruta para manejar el registro del cliente (POST)
router.post('/', async (req, res) => {
  const { valor, nombreServicio, salonSeleccionado } = req.body;
  const { servicios } = await getDatos();
  const nuevoIdServicio = servicios.length + 1;

  try {
    // Inserción en la base de datos
    await pool.query('INSERT INTO servicio (id_servicio, valor_servicio, nombre_servicio, disponible, ref_id_salon) VALUES ($1, $2, $3, $4, $5);', 
      [nuevoIdServicio, valor, nombreServicio, 0, salonSeleccionado]);
    res.send();
  } catch (error) {
    console.error('Error al agendar la cita:', error);
    res.status(500).send('Error al agendar la cita');
  }
});

export default router;