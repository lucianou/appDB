import { Router } from 'express';
import { pool } from './../database/connectionPostgreSQL.js';

const router = Router();

// Función para obtener las comunas y los clientes de la base de datos
const getDatos = async () => {
  try {
    const comunaResult = await pool.query('SELECT id_comuna, nombre_comuna FROM comuna;');
    const empleadoResult = await pool.query('SELECT id_empleado FROM empleado;');
    const cargoResult = await pool.query('SELECT id_cargo, nombre_cargo FROM cargo;');
    return {
      comunas: comunaResult.rows,
      empleados: empleadoResult.rows,
      cargos: cargoResult.rows
    };
  } catch (error) {
    console.error('Error al obtener las comunas y empleados:', error);
    return { comunas: [], empleado: [] , cargos: []};
  }
};

// Ruta para la página de registro de clientes (GET)
router.get('/', async (req, res) => {
  const { comunas, empleados, cargos } = await getDatos();
  res.render('citas', { comunas, empleados , cargos}); // Renderizar el archivo de vista clientes.ejs con la lista de comunas
});

// Ruta para manejar el registro del cliente (POST)
router.post('/', async (req, res) => {
  const { rut, nombre, telefono, comunaSeleccionada, cargoSeleccionado } = req.body;
  const { empleados } = await getDatos();
  const nuevoIdEmpleado = empleados.length + 1;

  try {
    // Inserción en la base de datos
    await pool.query('INSERT INTO cita (id_cita, estado_cita, horario_ini,horario_fin, ref_id_empleado,ref_id_cliente_salon,ref_id_salon) VALUES ($1, $2, $3, $4)', 
      [nuevoIdCita ,estadoCita, horaInicio, horaFin, peluqueroSeleccionado, clienteSeleccinado, salonSeleccionado]);
    res.send(`Cita agendada para el cliente: ${nombreCliente}, RUT: ${rutCliente}, con el peluquero: ${peluqueroSeleccionado}, en la fecha: ${fechaSeleccionada} a las: ${horaSeleccionada}`);
  } catch (error) {
    console.error('Error al agendar la cita:', error);
    res.status(500).send('Error al agendar la cita');
  }
});

export default router;
