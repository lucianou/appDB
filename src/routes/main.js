import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('main'); // Asegúrate de tener una vista main.ejs en la carpeta views
});

export default router;
