import { Router } from 'express';
import { pool } from './../database/connectionPostgreSQL.js';

const router = Router();

// Función para obtener los datos iniciales
const getDatos = async () => {
  try {
    const empleadoResult = await pool.query('SELECT id_empleado, nombre_empleado FROM empleado;');
    const salonResult = await pool.query('SELECT id_salon, nombre_salon FROM salon;');
    const citasResult = await pool.query('SELECT id_cita FROM cita;');
    return {
      empleados: empleadoResult.rows,
      salones: salonResult.rows,
      citas : citasResult.rows
    };
  } catch (error) {
    console.error('Error al obtener los datos iniciales:', error);
    return { empleados: [], salones: [] , citas : [] };
  }
};

// Ruta para la página de registro de citas (GET)
router.get('/', async (req, res) => {
  const { empleados, salones } = await getDatos();
  res.render('citas', { empleados, salones}); // Renderizar la vista con empleados y salones
});

// Ruta para manejar el registro de la cita (POST)
router.post('/', async (req, res) => {
  const { estadoCita, horaInicio, horaFin, empleadoSeleccionado, clienteSalonSeleccionado, salonSeleccionado, fecha } = req.body;
  const { citas } = await getDatos();
  const nuevoIdCita = citas.length + 1;


  try {
    // Inserción en la base de datos
    await pool.query('INSERT INTO cita (id_cita, estado_cita, dia, horario_ini, horario_fin, ref_id_empleado, ref_id_cliente_salon, ref_id_salon) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
      [nuevoIdCita, estadoCita || 0, fecha, horaInicio, horaFin, empleadoSeleccionado, clienteSalonSeleccionado, salonSeleccionado]);
    res.redirect('/citas');
  } catch (error) {
    console.error('Error al agendar la cita:', error);
    res.status(500).render('citas', { error: 'Error al agendar la cita', empleados: [], salones: [] });
  }
});

export default router;
