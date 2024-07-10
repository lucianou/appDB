import { Router } from 'express';
import { pool } from './../database/connectionPostgreSQL.js';

const router = Router();

// Función para obtener las comunas y los clientes de la base de datos
const getDatos = async () => {
  try {
    const comunaResult = await pool.query('SELECT id_comuna, nombre_comuna FROM comuna;');
    const clienteResult = await pool.query('SELECT id_cliente FROM cliente;');
    return {
      comunas: comunaResult.rows,
      clientes: clienteResult.rows
    };
  } catch (error) {
    console.error('Error al obtener las comunas y clientes:', error);
    return { comunas: [], clientes: [] };
  }
};

// Ruta para la página de registro de clientes (GET)
router.get('/', async (req, res) => {
  const { comunas, clientes } = await getDatos();
  const sexos = ['Masculino', 'Femenino'];
  res.render('clientes', { comunas, sexos, clientes }); // Renderizar el archivo de vista clientes.ejs con la lista de comunas
});

// Ruta para manejar el registro del cliente (POST)
router.post('/', async (req, res) => {
  const { rut, nombre, telefono, sexo, comunaSeleccionada } = req.body;
  const { clientes } = await getDatos();
  const nuevoIdCliente = clientes.length + 1;

  try {
    await pool.query(
      'INSERT INTO cliente (id_cliente, rut, nombre_cliente, telefono, sexo, ref_id_comuna) VALUES ($1, $2, $3, $4, $5, $6)',
      [nuevoIdCliente, rut, nombre, telefono, sexo, comunaSeleccionada]
    );
    res.send('Cliente registrado exitosamente');
  } catch (error) {
    console.error('Error al registrar el cliente:', error);
    res.status(500).send('Error al registrar el cliente');
  }
});

export default router;
