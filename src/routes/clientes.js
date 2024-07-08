// clientes.js
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('clientes');
});

export default router;
