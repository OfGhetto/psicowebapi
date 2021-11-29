import {Sequelize} from 'sequelize';
import {sequelize} from '../database/database';
import Usuario from './usuario';

const Rol = sequelize.define('rol',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull:false
    },
},{
    timestamps: false,
    tableName: 'rol'
});

Rol.hasMany(Usuario, {
    foreignKey: {
        name: 'rol_id'
    },
    sourceKey: 'id'
});

Usuario.belongsTo(Rol, {
    foreignKey: {
        name: 'rol_id'
    },
    sourceKey: 'id'
});

export default Rol;