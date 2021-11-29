import { Sequelize } from 'sequelize';
import { sequelize } from '../database/database';
import { Usuario } from '../models/usuario';
import FichaClinica from './ficha_clinica';
import Reserva from './reserva';

const Paciente = sequelize.define('paciente', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_de_nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }

}, {
    timestamps: false,
    tableName: 'paciente'
});

Paciente.hasOne(FichaClinica, {
    foreignKey: {
        name: 'paciente_id'
    },
    sourceKey: 'id'
})

FichaClinica.belongsTo(Paciente, {
    foreignKey: {
        name: 'paciente_id'
    },
    sourceKey: 'id'
});

Paciente.hasMany(Reserva, {
    foreignKey: {
        name: 'paciente_id',
    },
    sourceKey: 'id'
});
Reserva.belongsTo(Paciente, {
    foreignKey: {
        name: 'paciente_id',
    },
    sourceKey: 'id'
});

export default Paciente;