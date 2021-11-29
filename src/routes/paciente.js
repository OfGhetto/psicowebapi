import {Router} from 'express';
import {buscarPaciente, buscarPacientePorNombre, buscarPacientePorusuarioID, crearPaciente, editarPaciente, listarPaciente} from '../controllers/paciente.controller';

const router = Router();

router.post('/crear', crearPaciente);
router.get('/listar', listarPaciente);
router.post('/buscar', buscarPaciente);
router.put('/editar', editarPaciente);
router.post('/buscar/nombre', buscarPacientePorNombre);
router.post('/buscar/usuario/id', buscarPacientePorusuarioID);

export default router;