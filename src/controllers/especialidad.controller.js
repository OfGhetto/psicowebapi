import Especialidad from "../models/especialidad";

export async function crearEspecialidad(req, res){
    const {nombre} = req.body;
    try{
        let nuevaEspecialidad = await Especialidad.create({
            nombre
        })
        if(nuevaEspecialidad){
            res.json({
                code:200,
                message: 'Especialidad Creada Con Exito',
                data : nuevaEspecialidad
            });
        }
    }catch(e){
        res.json({
            code:400,
            message: 'Error al crear la Especialidad',
            error: e.errors
        });
    }
}

export async function listarEspecialidad(req, res){
    try{
        let especialidades = await Especialidad.findAll({
             attributes: ['id','nombre']
        });
        res.json({
            code:200,
            message: 'Especialidades Listadas Con Exito',
            especialidades
        });
    }catch(e){
        res.json({
            code:400,
            message: 'Error al listar las especialidades',
            error: e
        });
    }

}