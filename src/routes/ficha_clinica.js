import { Router } from "express";
import { buscarFichas, crearFicha, listarFichas, editarFicha, buscarFichaPorPaciente } from "../controllers/ficha_clinica.controller";

const router = Router();

router.post('/crear', crearFicha);
router.get('/listar',listarFichas);
router.post('/buscar', buscarFichas);
router.post('/editar', editarFicha);
router.post('/buscar/paciente', buscarFichaPorPaciente);

export default router;