import {Router} from 'express';
import { crearEstadoHorario, listarEstadoHorario } from '../controllers/estado_horario.controller';

const router = Router();

router.get('/listar', listarEstadoHorario);
router.post('/crear', crearEstadoHorario);

export default router;