import {Router} from 'express';
import { buscarReservasPorEstado, buscarReservasPorPaciente, buscarReservasPorProfesional, CrearReserva, listarReservas } from '../controllers/reserva.controller';

const router = Router();

router.get('/listar', listarReservas);
router.post('/buscar/paciente', buscarReservasPorPaciente);
router.post('/buscar/profesional', buscarReservasPorProfesional);
router.post('/buscar/estado', buscarReservasPorEstado)
router.post('/crear', CrearReserva);



export default router;