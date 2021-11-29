import EstadoReserva from "../models/estado_reserva";

export async function crearEstadoReserva(req, res){
    const {estado} = req.body;
    try{
        let nuevoEstadoReserva = await EstadoReserva.create({
            estado
        });
        if(nuevoEstadoReserva){
            res.json({
                code: 200,
                message: 'Estado de reserva creado correctamente',
                data: nuevoEstadoReserva
            });
        }

    }catch(e){
        res.json({
            code: 400,
            message: 'Error al crear la reserva',
            error: e.error
        });
    }
}

export async function listarEstadoReservas(req, res){
    try{
        let reserva = await EstadoReserva.findAll({
            attributes: ['id', 'estado'],
            order: [['id']]
        });
        if(reserva){
            res.json({
                code: 200,
                message: 'Estados listados correctamente',
                data: reserva
            });
        }
    }catch(e){
        res.json({
            code: 400,
            message: 'Error al listar',
            error: e.error
        });
    }
}