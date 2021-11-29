import {Router} from 'express';
import {crearEstadoReserva, listarEstadoReservas} from '../controllers/estado_reserva.controller';

const router = Router();

router.get('/listar', listarEstadoReservas);
router.post('/crear', crearEstadoReserva);

export default router;