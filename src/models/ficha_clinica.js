import { Sequelize } from 'sequelize';
import { sequelize } from '../database/database';
import Historial from './historial_sesiones';
import Paciente from './paciente';

const FichaClinica = sequelize.define('ficha_clinica', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    motivo_consulta: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paciente_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Paciente,
            key: 'id'
        },
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'ficha_clinica'
});


//Definicion relacion historial Sesiones

FichaClinica.hasMany(Historial, {
    foreignKey: {
        name: 'ficha_clinica_id'
    },
    sourceKey: 'id'
});

Historial.belongsTo(FichaClinica,{
    foreignKey: {
    name: 'ficha_clinica_id'
},
    sourceKey: 'id'
});


//


export default FichaClinica;