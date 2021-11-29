import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';
import Horario from '../models/horario';

const EstadoHorario = sequelize.define('estado_horario',{
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
    tableName: 'estado_horario'
});

EstadoHorario.hasMany(Horario, {
    foreignKey: {
        name: 'estado_horario_id',
    },
    sourceKey: 'id'
});
Horario.belongsTo(EstadoHorario, {
    foreignKey: {
        name: 'estado_horario_id',
    },
    sourceKey: 'id'
});

export default EstadoHorario;