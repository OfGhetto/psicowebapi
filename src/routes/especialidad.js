import {Router} from 'express';
import { crearEspecialidad, listarEspecialidad } from '../controllers/especialidad.controller';

const router = Router();

router.get('/listar', listarEspecialidad);
router.post('/crear', crearEspecialidad);

export default router;