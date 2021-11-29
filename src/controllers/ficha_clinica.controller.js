import FichaClinica from "../models/ficha_clinica";
import Paciente from "../models/paciente";
import Usuario from "../models/usuario";

export async function crearFicha(req, res) {
    const { fecha, motivo_consulta, paciente_id } = req.body;
    try {
        let nuevaFichaClinica = await FichaClinica.create({
            fecha,
            motivo_consulta,
            paciente_id
        })
        if (nuevaFichaClinica) {
            res.json({
                code: 200,
                message: 'Ficha Clinica creada correctamente',
                data: nuevaFichaClinica
            });
        }

    } catch (e) {
        res.json({
            code: 400,
            message: 'Error al crear ficha clinica',
            error: e.errors
        });
    }
}

export async function listarFichas(req, res) {
    try {
        let fichas = await FichaClinica.findAll({
            include: [{
                model: Paciente,
                attributes: ['fecha_de_nacimiento'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
                }]
            }],
            attributes: ['id', 'fecha', 'motivo_consulta'],
            order: [['id', 'DESC']]
        });
        res.json({
            code: 200,
            message: 'Fichas clinicas listadas correctamente',
            FichasClinicas: fichas
        });
    } catch (e) {
        res.json({
            code: 400,
            message: 'Error al listar las fichas clinicas',
            error: e
        });
    }
}

export async function buscarFichas(req, res) {
    const { id } = req.body;
    try {
        let fichaClinica = await FichaClinica.findOne({
            where: { id: id },
            include: [{
                model: Paciente,
                attributes: ['fecha_de_nacimiento'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
                }]
            }],
            attributes: ['id', 'fecha', 'motivo_consulta']
        });
        if (fichaClinica) {
            res.json({
                code: 200,
                message: 'La ficha ha sido encontrada con exito',
                data: fichaClinica
            });
        } else {
            res.json({
                code: 400,
                message: 'La ficha clinica no existe'
            });
        }
    } catch (e) {
        res.json({
            code: 401,
            message: 'ERROR'
        });
    }
}

export async function buscarFichaPorPaciente(req, res) {
    const { id } = req.body;
    try {
        let fichaClinica = await FichaClinica.findOne({
            where: { paciente_id: id },
            include: [{
                model: Paciente,            
                attributes: ['fecha_de_nacimiento'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
                }]
            }],
            attributes: ['id', 'fecha', 'motivo_consulta']
        });
        if (fichaClinica) {
            res.json({
                code: 200,
                message: 'La ficha ha sido encontrada con exito',
                data: fichaClinica
            });
        } else {
            res.json({
                code: 400,
                message: 'La ficha clinica no existe'
            });
        }
    } catch (e) {
        res.json({
            code: 401,
            message: 'ERROR'
        });
    }
}



export async function editarFicha(req, res) {
    const { id, fecha, motivo_consulta } = req.body;
    if (motivo_consulta) {
        try {
            let fichaClinica = await FichaClinica.findOne({
                where: { id: id }, attributes: ['id', 'fecha', 'motivo_consulta']
            });
            if (fichaClinica) {
                fichaClinica.update({ fecha, motivo_consulta });
                res.json({
                    code: 200,
                    message: 'Se ha editado correctamente',
                    data: fichaClinica
                });
            } else {
                res.json({
                    code: 400,
                    message: 'No se encontro la ficha clinica',
                });
            }
        } catch (e) {
            console.log(e.errors);
            res.json({
                code: 401,
                message: 'ERROR',
            });
        }
    } else {
        res.json({
            code: 203,
            message: 'INGRESE DATOS PARA EDITAR'
        });
    }
}
