// citas.js
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('citas');
});

export default router;
