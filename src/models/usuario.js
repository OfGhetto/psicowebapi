import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';
import Paciente from '../models/paciente';
import Profesional from '../models/profesional';

const Usuario = sequelize.define('usuario',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    correo: {
        /*email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        isEmail:true
        },
         unique: {
        args: true,
        msg: 'Email address already in use!'
        }
        }
        */
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg: 'Ingresa un correo'
            },
            isEmail: {
                msg: 'Ingresa un correo valido'}
        }
    },
    pass: {
        type: Sequelize.STRING,
        allowNull:false
    },
    pass_recovery: {
        type: Sequelize.STRING,
        allowNull:true
    },
    token: {
        type: Sequelize.STRING,
        allowNull:true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull:false
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull:false
    },
    rut: {
        type: Sequelize.STRING,
        allowNull:false
    },
    genero: {
        type: Sequelize.STRING,
        allowNull:false
    },
    telefono: {
        type: Sequelize.STRING,
        allowNull:false
    },
    rol_id: {
        type: Sequelize.INTEGER,
    }
},{
    timestamps: false,
    tableName: 'usuario'
});

//Definición relación paciente
Usuario.hasOne(Paciente, {
    foreignKey: {
        name: 'usuario_id',
    },
    sourceKey: 'id'
});
Paciente.belongsTo(Usuario, {
    foreignKey: {
        name: 'usuario_id',
    },
    sourceKey: 'id'
});

//Definición relación profesional
Usuario.hasOne(Profesional, {
    foreignKey: {
        name: 'usuario_id',
    },
    sourceKey: 'id'
});
Profesional.belongsTo(Usuario, {
    foreignKey: {
        name: 'usuario_id',
    },
    sourceKey: 'id'
});

export default Usuario;