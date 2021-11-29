import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';

const Reserva = sequelize.define('reserva',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    fecha:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    hora:{
        type: Sequelize.STRING,
        allowNull: false
    },
    profesional_id: {
        type: Sequelize.INTEGER,
    },
    paciente_id: {
        type: Sequelize.INTEGER,
    },
    estado_reserva_id: {
        type: Sequelize.INTEGER,
    }
},{
    timestamps: false,
    tableName: 'reserva'
});

export default Reserva;