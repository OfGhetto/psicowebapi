import FichaClinica from '../models/ficha_clinica';
import Paciente from '../models/paciente';
import Usuario from '../models/usuario';

export async function crearPaciente(req, res){
    const {fecha_de_nacimiento, usuario_id} = req.body;
    try{
        let nuevoPaciente = await Paciente.create({
            fecha_de_nacimiento,
            usuario_id
        })
        if(nuevoPaciente){
            res.json({
                code:200,
                message: 'Paciente Creado Con Exito',
                data : nuevoPaciente
            });
        }
    }catch(e){
        res.json({
            code:400,
            message: 'Error al crear al Paciente',
            error: e.errors
        });
    }
}


export async function listarPaciente(req, res){
    let Pacientes = await Paciente.findAll({
        include: [{Usuario,
            model: Usuario,
            attributes:['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
        },{Usuario,
            model: FichaClinica,
            attributes:['id']
        }],
        attributes:['id', 'fecha_de_nacimiento'],
        order:[['id','DESC']]
    });
    res.json({
        code:200,
        message: 'Pacientes Listados Con Exito',
        Pacientes : Pacientes
    });
}

export async function buscarPaciente(req, res){
    const {id} = req.body;
    try{
        let paciente = await Paciente.findOne({
            where:{id:id},
            include: [{
                model: Usuario,
                attributes:['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
            }],
            attributes:['id', 'fecha_de_nacimiento']
        });
        if(paciente){
            res.json({
                code:200,
                message: 'El Paciente ha sido encontrado con exito',
                data : paciente
            });
        }else{
            res.json({
                code:400,
                message: 'El Paciente no existe'
            });
        }
    }catch(e){
        res.json({
            code:401,
            message: 'ERROR'
        });
    }
}

export async function buscarPacientePorNombre(req, res){
    const {nombre} = req.body;
    try{
        let paciente = await Paciente.findAll({
            
            include: [{
                where:{nombre:nombre},
                model: Usuario,
                attributes:['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
            },{Usuario,
                model: FichaClinica,
                attributes:['id']
            }],
            attributes:['id', 'fecha_de_nacimiento']
        });
        if(paciente){
            res.json({
                code:200,
                message: 'El Paciente ha sido encontrado con exito',
                data : paciente
            });
        }else{
            res.json({
                code:400,
                message: 'El Paciente no existe'
            });
        }
    }catch(e){
        res.json({
            code:401,
            message: 'ERROR'
        });
    }
}

export async function editarPaciente(req, res){
    const {id, fecha_de_nacimiento} = req.body;
    if(fecha_de_nacimiento){
        try{
            let paciente = await Paciente.findOne({
                where:{id:id},
                include: [{
                    model: Usuario,
                    attributes:['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
                }],
                attributes:['id', 'fecha_de_nacimiento']
            });
            if(paciente){
                paciente.update({fecha_de_nacimiento});
                res.json({
                    code:200,
                    message: 'El Paciente ha sido editado con exito',
                    data : paciente
                });
            }else{
                res.json({
                    code:400,
                    message: 'El Paciente no existe'
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

export async function buscarPacientePorusuarioID(req, res){
    const {usuario_id} = req.body;
    try{
        let paciente = await Paciente.findOne({
            where:{
                usuario_id
            },
            attributes:['id']
        });
        if(paciente){
            res.json({
                code:200,
                message: 'El Paciente ha sido encontrado con exito',
                data : paciente
            });
        }else{
            res.json({
                code:400,
                message: 'El Paciente no existe'
            });
        }
    }catch(e){
        res.json({
            code:401,
            message: 'ERROR'
        });
    }
}
