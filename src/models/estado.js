import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';
import Profesional from './profesional';

const Estado = sequelize.define('estado',{
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
    tableName: 'estado'
});

Estado.hasMany(Profesional, {
    foreignKey: {
        name: 'estado_id',
    },
    sourceKey: 'id'
});
Profesional.belongsTo(Estado, {
    foreignKey: {
        name: 'estado_id',
    },
    sourceKey: 'id'
});

export default Estado;