require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/plataformaE`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models estan todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Alumnos } = sequelize.models;
const { Aulas } = sequelize.models;
const { Admin } = sequelize.models;
const { Materias } = sequelize.models;
const { Profesores } = sequelize.models;
const { Meses } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Alumnos.belongsTo(Aulas);
Aulas.hasMany(Alumnos);

Admin.hasMany(Profesores);
Profesores.belongsTo(Admin);

Profesores.belongsToMany(Aulas, { through: "ProfesorAula" });
Aulas.belongsToMany(Profesores, { through: "ProfesorAula" });

Materias.belongsToMany(Aulas, { through: "MateriasAula" });
Aulas.belongsToMany(Materias, { through: "MateriasAula" });

// Alumnos.belongsToMany(Meses, { through: "AlumnosMeses" });
// Meses.belongsToMany(Alumnos, { through: "AlumnosMeses" });

//MUCHOS A MUCHOS esta bien?
Profesores.belongsToMany(Materias, { through: "ProfesoresMateria" });
Materias.belongsToMany(Profesores, { through: "ProfesoresMateria" });
module.exports = {
  ...sequelize.models, // para poder importar los modelos asi: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexion { conn } = require('./db.js');
};
