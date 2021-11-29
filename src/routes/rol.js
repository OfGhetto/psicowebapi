import {Router} from 'express';
import {crearRol, listarRol} from '../controllers/rol.controller';

const router = Router();

router.get('/listar', listarRol);
router.post('/crear', crearRol);

export default router;