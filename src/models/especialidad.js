import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';
import Profesional from '../models/profesional';

const Especialidad = sequelize.define('especialidad',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'especialidad'
});

Especialidad.hasMany(Profesional, {
    foreignKey: {
        name: 'especialidad_id',
    },
    sourceKey: 'id'
});
Profesional.belongsTo(Especialidad, {
    foreignKey: {
        name: 'especialidad_id',
    },
    sourceKey: 'id'
});

export default Especialidad;