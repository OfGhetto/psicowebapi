import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';

const Historial = sequelize.define('historial_sesiones',{
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    asistencia: {
        type : Sequelize.BOOLEAN,
        allowNull: false
    },
    anamnesis: {
        type : Sequelize.STRING,
        allowNull: false
    },
    ficha_clinica_id:{
        type : Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'historial_sesiones'
});

export default Historial;