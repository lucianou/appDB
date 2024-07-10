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
  res.render('trabajadores', { comunas, empleados , cargos}); // Renderizar el archivo de vista clientes.ejs con la lista de comunas
});

// Ruta para manejar el registro del cliente (POST)
router.post('/', async (req, res) => {
  const { rut, nombre, telefono, comunaSeleccionada, cargoSeleccionado } = req.body;
  const { empleados } = await getDatos();
  const nuevoIdEmpleado = empleados.length + 1;

  try {
    await pool.query(
      'INSERT INTO empleado (id_empleado, rut, nombre_empleado, telefono, ref_id_comuna, ref_id_cargo) VALUES ($1, $2, $3, $4, $5, $6)',
      [nuevoIdEmpleado, rut, nombre, telefono, comunaSeleccionada, cargoSeleccionado]
    );
    res.send('empleado registrado exitosamente');
  } catch (error) {
    console.error('Error al registrar el empleado:', error);
    res.status(500).send('Error al registrar el empleado');
  }
});

export default router;
