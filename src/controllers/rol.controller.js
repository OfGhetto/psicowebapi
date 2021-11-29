import Rol from "../models/rol";

export async function crearRol(req, res){
    const {nombre} = req.body;
    try{
        let nuevoRol = await Rol.create({
            nombre
        })
        if(nuevoRol){
            res.json({
                code:200,
                message: 'Rol Creado Con Exito',
                data : nuevoRol
            });
        }
    }catch(e){
        res.json({
            code:400,
            message: 'Error al crear el Rol',
            error: e.errors
        });
    }
}

export async function listarRol(req, res){
    try{
        let roles = await Rol.findAll({
             attributes: ['id','nombre']
        });
        res.json({
            code:200,
            message: 'Roles Listados Con Exito',
            roles
        });
    }catch(e){
        res.json({
            code:400,
            message: 'Error al listar los roles',
            error: e
        });
    }

}