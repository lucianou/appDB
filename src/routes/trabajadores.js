// trabajadores.js
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('trabajadores');
});

export default router;
