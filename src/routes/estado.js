import {Router} from 'express';
import {crearEstado, listarEstado} from '../controllers/estado.controller';

const router = Router();

router.get('/listar', listarEstado);
router.post('/crear', crearEstado);

export default router;