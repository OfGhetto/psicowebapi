import {Router} from 'express';
import { buscarUsuario, crearUsuario, editarUsuario, 
        listarUsuario, login, logout } from '../controllers/usuario.controller';

const router = Router();

router.post('/crear', crearUsuario);
router.get('/listar', listarUsuario);
router.post('/buscar', buscarUsuario);
router.post('/editar', editarUsuario);
router.post('/logout', logout);
router.post('/login', login);
export default router;