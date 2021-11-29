import Estado from "../models/estado";

export async function crearEstado(req, res){
    const {nombre} = req.body;
    try{
        let nuevoEstado = await Estado.create({
            nombre
        })
        if(nuevoEstado){
            res.json({
                code:200,
                message: 'Estado Creado Con Exito',
                data : nuevoEstado
            });
        }
    }catch(e){
        res.json({
            code:400,
            message: 'Error al crear el Estado',
            error: e.errors
        });
    }
}

export async function listarEstado(req, res){
    try{
        let estados = await Estado.findAll({
             attributes: ['id','nombre']
        });
        res.json({
            code:200,
            message: 'Estados Listados Con Exito',
            estados
        });
    }catch(e){
        res.json({
            code:400,
            message: 'Error al listar los estados',
            error: e
        });
    }

}