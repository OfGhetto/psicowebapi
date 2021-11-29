import { Router } from "express";
import { buscarHistorial, crearHistorial, editarHistorial, listarHistorial, listarHistorialPorFicha } from "../controllers/historial_sesiones.controller";

const router = Router();

router.post('/crear', crearHistorial);
router.get('/listar', listarHistorial);
router.post('/buscar', buscarHistorial);
router.put('/editar', editarHistorial);
router.get('/listar/ficha',listarHistorialPorFicha);

export default router;