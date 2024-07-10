import { Router } from 'express';
import { pool } from './../database/connectionPostgreSQL.js';

const router = Router();

// Función para obtener las comunas y los clientes de la base de datos
const getDatos = async () => {
  try {
    const citasResult = await pool.query('SELECT id_cita FROM cita;');
    const empleadoResult = await pool.query('SELECT id_empleado, nombre_empleado FROM empleado;');
    const salonResult = await pool.query('SELECT id_salon, nombre_salon FROM salon;');
    const clienteSalonResult = await pool.query('SELECT id_cliente_salon, ref_id_cliente FROM cliente_salon;');
    return {
      citas: citasResult.rows,
      empleados: empleadoResult.rows,
      salones: salonResult.rows,
      clientes: clienteSalonResult.rows
    };
  } catch (error) {
    console.error('Error al obtener las comunas y empleados:', error);
    return { citas: [], empleado: [] , salones: [], clientes: []};
  }
};

// Ruta para la página de registro de clientes (GET)
router.get('/', async (req, res) => {
  const { citas, empleados, clientes, salones } = await getDatos();
  res.render('citas', { citas, empleados , clientes , salones}); // Renderizar el archivo de vista clientes.ejs con la lista de comunas
});

// Ruta para manejar el registro del cliente (POST)
router.post('/', async (req, res) => {
  const { estadoCita, horaInicio, horaFin, empleadoSeleccionado, clienteSalonSeleccionado, salonSeleccionado } = req.body;
  const { citas } = await getDatos();
  const nuevoIdCita = citas.length + 1;

  try {
    // Inserción en la base de datos
    await pool.query('INSERT INTO cita (id_cita, estado_cita, horario_ini,horario_fin, ref_id_empleado,ref_id_cliente_salon,ref_id_salon) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
      [nuevoIdCita ,estadoCita, horaInicio, horaFin, empleadoSeleccionado, clienteSalonSeleccionado, salonSeleccionado]);
    res.send(`Cita agendada para el cliente: ${clienteSalonSeleccionado}, salon: ${salonSeleccionado}, con el peluquero: ${empleadoSeleccionado}, a las: ${horaInicio}`);
  } catch (error) {
    console.error('Error al agendar la cita:', error);
    res.status(500).send('Error al agendar la cita');
  }
});

export default router;
