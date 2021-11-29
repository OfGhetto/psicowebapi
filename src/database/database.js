import Sequelize from 'sequelize';
//en la instancia sequelize piden 4, el primer parametro es el nombre de la bd, el segundo es el usuario de mysql, el tercero la clave de ese usuario y el cuarto la config de la bd.
export const sequelize = new Sequelize('mydb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    },
    //Evita mostrar mensaje en consola
    logging:true
  });