// servicios.js
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('servicios');
});

export default router;
