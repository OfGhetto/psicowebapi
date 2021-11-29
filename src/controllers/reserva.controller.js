import Reserva from "../models/reserva";
import Profesional from "../models/profesional";
import Paciente from "../models/paciente";
import EstadoReserva from "../models/estado_reserva";
import Usuario from "../models/usuario";
import Horario from "../models/horario";

export async function CrearReserva(req, res) {
    const { fecha, hora, profesional_id, paciente_id,id} = req.body;
    const estado_reserva_id = 1;
    console.log(fecha,profesional_id,paciente_id,hora,id);
    try {
        let nuevaReserva = await Reserva.create({
            fecha, hora, profesional_id, paciente_id, estado_reserva_id
        });
        if (nuevaReserva) {
            let horario = await Horario.findOne({
                where:{id:id}
            });
            console.log(horario);
            let estado_horario_id=2;

             horario.update({estado_horario_id});
            res.json({
                code: 200,
                message: 'Reserva creada con exito',
                data: nuevaReserva
            });
        }
        

    } catch (e) {
        console.log(e);
        res.json({
            code: 400,
            message: 'Error al crear la reserva',
            error: e.error
        });
    }
}

export async function listarReservas(req, res) {
    try {
        let reservas = await Reserva.findAll({
            include: [{
                model: Profesional,
                attributes: ['descripcion'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut']
                }]
            }, {
                model: EstadoReserva,
                attributes: ['estado']
            },
            {
                model: Paciente,
                attributes: ['fecha_de_nacimiento'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut']
                }]
            },
            ],
            attributes: ['fecha', 'hora'],
            order: [['fecha', 'DESC']]
        });
        res.json({
            code: 200,
            message: 'Reservas listadas correctamente',
            Reservas: reservas
        });
    } catch (e) {
        res.json({
            code: 400,
            message: 'Error al listar',

        });
    }
}

export async function buscarReservasPorPaciente(req, res) {
    const { id } = req.body;
    try {
        let reserva = await Reserva.findAll({
            where: { paciente_id: id },
            include: [{
                model: Profesional,
                attributes: ['descripcion'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut']
                }]
            }, {
                model: EstadoReserva,
                attributes: ['estado']
            },
            {
                model: Paciente,
                attributes: ['fecha_de_nacimiento'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut']
                }]
            },
            ],
            attributes: ['fecha', 'hora'],
            order: [['fecha', 'DESC']]
        });
        if (reserva) {
            res.json({
                code: 200,
                message: 'Reservas listadas correctamente',
                Reservas: reserva
            });
        } else {
            res.json({
                code: 400,
                message: 'No existe reserva asociada al paciente',
            });
        }
    } catch (e) {
        res.json({
            code: 401,
            message: 'Error',

        });
    }
}

export async function buscarReservasPorProfesional(req, res) {
    const { id } = req.body;
    try {
        let reserva = await Reserva.findAll({
            where: { profesional_id: id },
            include: [{
                model: Profesional,
                attributes: ['descripcion'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut']
                }]
            }, {
                model: EstadoReserva,
                attributes: ['estado']
            },
            {
                model: Paciente,
                attributes: ['fecha_de_nacimiento'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut']
                }]
            },
            ],
            attributes: ['fecha', 'hora'],
            order: [['fecha', 'DESC']]
        });
        if (reserva) {
            res.json({
                code: 200,
                message: 'Reservas listadas correctamente',
                Reservas: reserva
            });
        } else {
            res.json({
                code: 400,
                message: 'No existe reserva asociada al paciente',
            });
        }
    } catch (e) {
        res.json({
            code: 401,
            message: 'ERROR',

        });
    }
}

export async function buscarReservasPorEstado(req, res) {
    const { estado } = req.body;
    try {
        let reserva = await Reserva.findAll({
            include: [{
                model: Profesional,
                attributes: ['descripcion'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut']
                }]
            }, {
                where: { estado: estado },
                model: EstadoReserva,
                attributes: ['estado']
            },
            {
                model: Paciente,
                attributes: ['fecha_de_nacimiento'],
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut']
                }]
            },
            ],
            attributes: ['fecha', 'hora'],
            order: [['fecha', 'DESC']]
        });
        if (reserva) {
            res.json({
                code: 200,
                message: 'Reservas listadas correctamente',
                Reservas: reserva
            });
        } else {
            res.json({
                code: 400,
                message: 'No existe reserva asociada al paciente',
            });
        }
    } catch (e) {
        res.json({
            code: 401,
            message: 'ERROR',

        });
    }
}