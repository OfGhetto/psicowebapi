import FichaClinica from "../models/ficha_clinica";
import Historial from "../models/historial_sesiones";

export async function crearHistorial(req, res) {
    const { fecha, asistencia, anamnesis, ficha_clinica_id } = req.body;
    try {
        let nuevoHistorial = await Historial.create({
            fecha,
            asistencia,
            anamnesis,
            ficha_clinica_id
        });
        if (nuevoHistorial) {
            res.json({
                code: 200,
                message: 'El historial se ha creado correctamente',
                data: nuevoHistorial
            });
        }
    } catch (e) {
        res.json({
            code: 400,
            message: 'Error al crear el historial ' + e.errors,
        });
    }
}

export async function listarHistorial(req, res) {
    let Historiales = await Historial.findAll({
        include: [{
            model: FichaClinica,
            attributes: ['motivo_consulta']
        }],
        attributes: ['id', 'fecha', 'asistencia', 'anamnesis'],
        order: [['id', 'DESC']]
    });
    res.json({
        code: 200,
        message: 'Se ha listado correctamente',
        data: Historiales
    });
}


export async function listarHistorialPorFicha(req, res) {
    const {id} = req.body;
    let Historiales = await Historial.findAll({
        where: { ficha_clinica_id: id },
        include: [{
            model: FichaClinica,
            attributes: ['motivo_consulta']
        }],
        attributes: ['id', 'fecha', 'asistencia', 'anamnesis'],
        order: [['id', 'DESC']]
    });
    res.json({
        code: 200,
        message: 'Se ha listado correctamente',
        data: Historiales
    });
}

export async function buscarHistorial(req, res) {
    const { id } = req.body;
    try {
        let historial = await Historial.findOne({
            where: { id: id },
            attributes: ['id', 'fecha', 'asistencia', 'anamnesis']
        });
        if (historial) {
            res.json({
                code: 200,
                message: 'Se ha encontrado el historial con exito',
                data: historial
            });
        } else {
            res.json({
                code: 400,
                message: 'No existe historial asociado al id'
            });
        }
    } catch (e) {
        res.json({
            code: 401,
            message: 'ERROR',

        });

    }
}

export async function editarHistorial(req, res) {
    const { id, fecha, asistencia, anamnesis } = req.body;
    if (anamnesis && fecha && asistencia) {
        try {
            let historial = await Historial.findOne({
                where: { id: id },
                attributes: ['id', 'fecha', 'asistencia', 'anamnesis']
            });
            if (historial) {
                historial.update({ fecha, asistencia, anamnesis });
                res.json({
                    code: 200,
                    message: 'Se ha editado el historial con exito',
                    data: historial
                });
            } else {
                res.json({
                    code: 400,
                    message: 'No existe historial'
                });
            }
        } catch (e) {
            res.json({
                code: 401,
                message: 'ERROR'
            });
        }
    } else {
        res.json({
            code: 203,
            message: 'Ingrese valores a editar'
        });
    }
}
