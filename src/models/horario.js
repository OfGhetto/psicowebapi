import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';

const Horario = sequelize.define('horario',{
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
        type: Sequelize.INTEGER
    },
    estado_horario_id: {
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    tableName: 'horario'
});

export default Horario;