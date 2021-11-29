import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';
import Reserva from '../models/reserva';
import Horario from '../models/horario';

const Profesional = sequelize.define('profesional', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    activo: {
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    rnpi: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    fecha_solicitud:{
        type: Sequelize.DATEONLY,
        allowNull:false
    },
    actualizacion_solicitud:{
        type: Sequelize.DATEONLY,
    },
    descripcion:{
        type: Sequelize.STRING
    },
    usuario_id: {
        type: Sequelize.INTEGER
    },
    estado_id: {
        type: Sequelize.INTEGER
    },
    especialidad_id: {
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    tableName: 'profesional'
});

Profesional.hasMany(Reserva, {
    foreignKey: {
        name: 'profesional_id',
    },
    sourceKey: 'id'
});
Reserva.belongsTo(Profesional, {
    foreignKey: {
        name: 'profesional_id',
    },
    sourceKey: 'id'
});

Profesional.hasMany(Horario, {
    foreignKey: {
        name: 'profesional_id',
    },
    sourceKey: 'id'
});
Horario.belongsTo(Profesional, {
    foreignKey: {
        name: 'profesional_id',
    },
    sourceKey: 'id'
});

export default Profesional;