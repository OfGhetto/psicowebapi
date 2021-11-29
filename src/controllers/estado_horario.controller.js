import EstadoHorario from "../models/estado_horario";

export async function crearEstadoHorario(req, res) {
    const { nombre } = req.body;
    try {
        let nuevoEstadoHorario = await EstadoHorario.create({
            nombre
        });
        if (nuevoEstadoHorario) {
            res.json({
                code: 200,
                message: 'Estado de horario creado correctamente',
                data: nuevoEstadoHorario
            });
        }

    } catch (e) {
        res.json({
            code: 400,
            message: 'Error al crear el estado horario',
            error: e.error
        });
    }
}

export async function listarEstadoHorario(req, res) {
    try {
        let estadoHorario = await EstadoHorario.findAll({
            attributes: ['id', 'nombre'],
            order: [['id']]
        });
        if (estadoHorario) {
            res.json({
                code: 200,
                message: 'Estados listados correctamente',
                data: estadoHorario
            });
        }
    } catch (e) {
        res.json({
            code: 400,
            message: 'Error al listar',
            error: e.error
        });
    }
}