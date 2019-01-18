let Sequelize =require("sequelize");


const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        underscored: true
    },
    operatorsAliases: false,
} );
const models = {
    User: sequelize.import( "./user" ),
};


Object.keys( models ).forEach( modelName => {
    if (models[ modelName ].associate) {
        models[ modelName ].associate( models );
    }
} );

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
