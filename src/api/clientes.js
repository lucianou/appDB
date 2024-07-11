import { Router } from 'express';
import { pool } from './../database/connectionPostgreSQL.js';

const router = Router();

// Función para obtener los clientes por salón
const getClientesPorSalon = async (salonId) => {
  try {
    const result = await pool.query(`
      SELECT cs.id_cliente_salon, c.nombre_cliente 
      FROM cliente_salon cs
      INNER JOIN cliente c ON cs.ref_id_cliente = c.id_cliente
      WHERE cs.ref_id_salon = $1;
    `, [salonId]);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener los clientes por salón:', error);
    return [];
  }
};

// Ruta para obtener los clientes por salón (API)
router.get('/:salonId', async (req, res) => {
  const salonId = req.params.salonId;
  const clientes = await getClientesPorSalon(salonId);
  res.json(clientes);
});

export default router;
