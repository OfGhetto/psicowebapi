import Usuario from '../models/usuario';
import Paciente from '../models/paciente';
import Profesional from '../models/profesional';
import Rol from '../models/rol';

export async function crearUsuario(req, res){
    const {correo, pass, nombre, apellido, rut, genero, telefono, rol_id} = req.body;
    try{
        let nuevoUsuario = await Usuario.create({
            correo,
            pass,
            nombre,
            apellido,
            rut,
            genero,
            telefono,
            rol_id
        })
        if(nuevoUsuario){
            res.json({
                code:200,
                message: 'Usuario Creado Con Exito',
                data : nuevoUsuario
            });
        }
    }catch(e){
        res.json({
            code:400,
            message: 'Error al crear al usuario',
            error: e.errors
        });
    }
}

export async function listarUsuario(req, res){
    let usuarios = await Usuario.findAll({
        include: [{
            model: Rol,
            attributes:['nombre']
        }],
        attributes:['id', 'nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono'],
        order:[['id','ASC']]
    });
    
    res.json({
        code:200,
        message: 'Usuarios Listados Con Exito',
        usuarios : usuarios
    });
}


export async function buscarUsuario(req, res){
    const {id} = req.body;
    try{
        let usuario = await Usuario.findOne({
            where:{id:id},
            include: [{
                model: Rol,
                attributes:['nombre']
            }],
            attributes:['id', 'nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
        });
        if(usuario){
            res.json({
                code:200,
                message: 'El usuario ha sido encontrado con exito',
                data : usuario
            });
        }else{
            res.json({
                code:400,
                message: 'El Usuario no existe'
            });
        }
    }catch(e){
        res.json({
            code:401,
            message: 'ERROR'
        });
    }
}

export async function editarUsuario(req, res){
    const {id, correo, nombre, apellido, rut, genero, telefono} = req.body;
    if(id && correo && nombre && apellido && rut && genero && telefono){
        try{
            let usuario = await Usuario.findOne({
                where:{id:id},
                attributes:['id', 'correo', 'nombre', 'apellido', 'rut', 'genero', 'telefono']
            });
            if(usuario){
                usuario.update({correo, nombre, apellido, rut, genero, telefono});
                res.json({
                    code:200,
                    message: 'El Profesional ha sido editado con exito',
                    data : usuario
                });
            }else{
                res.json({
                    code:400,
                    message: 'El Profesional no existe'
                });
            }
        }catch(e){
            res.json({
                code:401,
                message: 'ERROR'
            });
        }
    }else{
        res.json({
            code:203,
            message: 'NO HA INGRESADO CAMPOS PARA EDITAR'
        });
    }
}

export async function login(req, res){

    const { correo, pass} = req.body;
    console.log(correo,pass);
    try{
        let usuario = await Usuario.findOne({
            where:{correo: correo, pass: pass},
            include: [{
                model: Rol,
                attributes:['nombre']
            }],
            attributes:['id', 'nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
        });
        if(usuario){
            const token = 1;
            usuario.update({token});
            res.json({
                code:200,
                message: 'El Profesional ha sido ingresado con éxito',
                data : usuario
            });
        }else{
            res.json({
                code:400,
                message: 'Credenciales inválidas'
            });
        }
    }catch(e){
        console.log(e.errors)
        res.json({
            code:401,
            message: 'ERROR'
        });
    }
    
}

export async function logout(req, res){
    const {id} = req.body;
    try{
        let usuario = await Usuario.findOne({
            where:{id:id},
            attributes:['id', 'correo', 'nombre', 'apellido', 'rut', 'genero', 'telefono']
        });
        if(usuario){
            const token = 0;
            usuario.update({token});
            res.json({
                code:200,
                message: 'El Profesional ha salido con éxito',
                data : usuario
            });
        }else{
            res.json({
                code:400,
                message: 'El Profesional no existe'
            });
        }
    }catch(e){
        res.json({
            code:401,
            message: 'ERROR'
        });
    }
}