import Profesional from '../models/profesional';
import Usuario from '../models/usuario';
import Estado from '../models/estado';
import Especialidad from '../models/especialidad';

export async function crearProfesional(req, res) {
    const { activo, rnpi, descripcion, usuario_id, especialidad_id } = req.body;
    //INDICA ESTADO PENDIENTE
    const estado_id = 1;
    let dia = new Date().getDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();
    let fecha_solicitud = '';
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (dia < 10) {
        dia = '0' + dia;
    }
    fecha_solicitud = anio + '-' + mes + '-' + dia;
    try {
        let nuevoProfesional = await Profesional.create({
            activo,
            rnpi,
            fecha_solicitud,
            descripcion,
            usuario_id,
            estado_id,
            especialidad_id
        })
        if (nuevoProfesional) {
            res.json({
                code: 200,
                message: 'Profesional Creado Con Exito',
                data: nuevoProfesional
            });
        }
    } catch (e) {
        res.json({
            code: 400,
            message: 'Error al crear al Profesional',
            error: e.errors
        });
    }
}

export async function listarProfesional(req, res) {
    let profesionales = await Profesional.findAll({
        include: [{
            model: Usuario,
            attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
        },
        {
            model: Estado,
            where: { nombre: 'pendiente' },
            attributes: ['nombre']
        }, {
            model: Especialidad,
            attributes: ['nombre']
        }],
        attributes: ['id', 'activo', 'rnpi', 'descripcion', 'fecha_solicitud'],
        order: [['id', 'ASC']]
    });
    res.json({
        code: 200,
        message: 'Profesionales Listados Con Exito',
        profesionales: profesionales
    });
}

export async function listarProfesionalesAprobados(req, res) {
    let profesionales = await Profesional.findAll({
        include: [{
            model: Usuario,
            attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
        },
        {
            model: Estado,
            attributes: ['nombre'],
            where: { nombre: 'aprobado' }
        }, {
            model: Especialidad,
            attributes: ['nombre']
        }],
        attributes: ['id', 'activo', 'rnpi', 'descripcion', 'actualizacion_solicitud'],
        order: [['id', 'ASC']]
    });
    res.json({
        code: 200,
        message: 'Profesionales Listados Con Exito',
        profesionales: profesionales
    });
}

export async function listarProfesionalesRechazado(req, res) {
    let profesionales = await Profesional.findAll({
        include: [{
            model: Usuario,
            attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
        },
        {
            model: Estado,
            attributes: ['nombre'],
            where: { nombre: 'rechazado' }
        }, {
            model: Especialidad,
            attributes: ['nombre']
        }],
        attributes: ['id', 'activo', 'rnpi', 'descripcion', 'actualizacion_solicitud'],
        order: [['id', 'ASC']]
    });
    res.json({
        code: 200,
        message: 'Profesionales Listados Con Exito',
        profesionales: profesionales
    });
}

export async function buscarProfesional(req, res) {
    const { id } = req.body;
    try {
        let profesional = await Profesional.findOne({
            where: { id: id },
            include: [{
                model: Estado,
                attributes: ['nombre']
            }, {
                model: Usuario,
                attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
            }, {
                model: Especialidad,
                attributes: ['nombre']
            }],
            attributes: ['id', 'activo', 'rnpi', 'descripcion']
        });
        if (profesional) {
            res.json({
                code: 200,
                message: 'El Profesional ha sido encontrado con exito',
                data: profesional
            });
        } else {
            res.json({
                code: 400,
                message: 'El Profesional no existe'
            });
        }
    } catch (e) {
        res.json({
            code: 401,
            message: 'ERROR'
        });
    }
}

export async function aprobarProfesional(req, res) {
    let message;
    const { estado_id, id, actualizacion_solicitud } = req.body;
    try {
        let profesional = await Profesional.findOne({
            where: { id: id },
            include: [{
                model: Estado,
                attributes: ['nombre']
            }, {
                model: Usuario,
                attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
            }, {
                model: Especialidad,
                attributes: ['nombre']
            }],
            attributes: ['id', 'activo', 'rnpi', 'descripcion', 'actualizacion_solicitud']
        });
        if (profesional) {
            if (estado_id == 3) {
                message = 'El Profesional ha sido rechazado con exito';
            }
            if (estado_id == 2) {
                message = 'El Profesional ha sido autorizado con exito';
            }
            profesional.update({ estado_id, actualizacion_solicitud });
            res.json({
                code: 200,
                message,
                data: profesional
            });
        } else {
            res.json({
                code: 400,
                message: 'El Profesional no existe'
            });
        }
    } catch (e) {
        res.json({
            code: 401,
            message: 'ERROR'
        });
    }
}

export async function editarProfesional(req, res) {
    const { id, activo, rnpi, descripcion } = req.body;
    if (activo && rnpi && descripcion) {
        try {
            let profesional = await Profesional.findOne({
                where: { id: id },
                include: [{
                    model: Usuario,
                    attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
                }],
                attributes: ['id', 'activo', 'rnpi', 'descripcion']
            });
            if (profesional) {
                profesional.update({ activo, rnpi, descripcion });
                res.json({
                    code: 200,
                    message: 'El Profesional ha sido editado con exito',
                    data: profesional
                });
            } else {
                res.json({
                    code: 400,
                    message: 'El Profesional no existe'
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
            message: 'NO HA INGRESADO CAMPOS PARA EDITAR'
        });
    }
}

export async function BuscarProfesionalAprobadoPorNombre(req, res) {
    const { nombre } = req.body;
    let profesional = await Profesional.findAll({
        include: [{
            where: {nombre: nombre},
            model: Usuario,
            attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
        },{
            model: Estado,
            attributes: ['nombre'],
            where: { nombre: 'aprobado' }
        },{
            model: Especialidad,
            attributes: ['nombre']
        }],
        attributes: ['id', 'activo', 'rnpi', 'descripcion', 'actualizacion_solicitud'],
        order: [['id', 'ASC']]
    });
    res.json({
        code: 200,
        message: 'Profesional listado con exito',
        profesionales: profesional
    });
}

export async function buscarProfesionalPorEspecialidad(req, res){
    const {nombre} = req.body;
    try{
        let profesional = await Profesional.findAll({
            include: [{
                where:{nombre: nombre},
                model: Especialidad,
                attributes:['nombre']
            },{Usuario,
                model: Usuario,
                attributes:['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
            }],
            attributes:['id', 'activo', 'rnpi', 'descripcion']
        });
        if(profesional){
            res.json({
                code:200,
                message: 'El profesional ha sido encontrado con exito',
                data : profesional
            });
        }else{
            res.json({
                code:400,
                message: 'El profesional no existe'
            });
        }
    }catch(e){
        res.json({
            code:401,
            message: 'ERROR'
        });
    }
}

export async function buscarProfesionalPorUsuario(req, res) {
    const { id } = req.body;
    try {
        let profesional = await Profesional.findOne({
            where: { id },
            include: [{
                model: Estado,
                attributes: ['nombre']
            }, {
                model: Usuario,
                attributes: ['nombre', 'apellido', 'correo', 'rut', 'genero', 'telefono']
            }, {
                model: Especialidad,
                attributes: ['nombre']
            }],
            attributes: ['id', 'activo', 'rnpi', 'descripcion']
        });
        if (profesional) {
            res.json({
                code: 200,
                message: 'El Profesional ha sido encontrado con exito',
                data: profesional
            });
        } else {
            res.json({
                code: 400,
                message: 'El Profesional no existe'
            });
        }
    } catch (e) {
        res.json({
            code: 401,
            message: 'ERROR'
        });
    }
}