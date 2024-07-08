import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Aquí puedes añadir la lógica de autenticación
    if (username === 'admin' && password === 'password') {
      res.redirect('/main');    
    } 
      else {
      res.render('login', { error: 'Nombre de usuario o contraseña incorrectos' });   
    }
});

export default router;
