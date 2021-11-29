import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';
import Reserva from '../models/reserva';

const EstadoReserva = sequelize.define('estado_reserva',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    estado:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'estado_reserva'
});

EstadoReserva.hasMany(Reserva, {
    foreignKey: {
        name: 'estado_reserva_id',
    },
    sourceKey: 'id'
});
Reserva.belongsTo(EstadoReserva, {
    foreignKey: {
        name: 'estado_reserva_id',
    },
    sourceKey: 'id'
});

export default EstadoReserva;