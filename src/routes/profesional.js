import {Router} from 'express';
import {aprobarProfesional, buscarProfesional, BuscarProfesionalAprobadoPorNombre, buscarProfesionalPorEspecialidad, buscarProfesionalPorUsuario, crearProfesional, editarProfesional, listarProfesional, listarProfesionalesAprobados, listarProfesionalesRechazado} from '../controllers/profesional.controller';

const router = Router();

router.post('/crear', crearProfesional);
router.get('/listar', listarProfesional);
router.post('/buscar', buscarProfesional);
router.post('/editar', editarProfesional);
router.get('/listar/aprobado', listarProfesionalesAprobados);
router.get('/listar/rechazado', listarProfesionalesRechazado);
router.post('/actualizacion/estado', aprobarProfesional);
router.post('/buscar/aprobado/nombre', BuscarProfesionalAprobadoPorNombre);
router.post('/buscar/profesional/especialidad', buscarProfesionalPorEspecialidad);
router.post('/buscar/profesional/usuario', buscarProfesionalPorUsuario);
export default router;