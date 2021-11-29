import {Router} from 'express';
import { buscarDisponibilidad, cargarHorario } from '../controllers/horario.controller';

const router = Router();

router.post('/crear', cargarHorario);
router.post('/buscar/disponibilidad', buscarDisponibilidad);
export default router;