const { auth, db } = require("../../config/firebase");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { Alumnos, Profesores, Admin, Materias, ProfesoresMateria } = require("../../db");
const { doc, getDoc } = require("firebase/firestore");

const postLogin = async (email, password) => {
  try {
    // Authenticate user with email and password
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    // Fetch user's role from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userData = (await getDoc(userDocRef)).data();
    if (userData && userData.email) {
      const admin = await Admin.findOne({ where: { email: userData.email } });
      const alumnodb = await Alumnos.findOne({ where: { email: userData.email } });
      const profesordb = await Profesores.findOne({ where: { email: userData.email } });

      if (profesordb) {
        // Traigo todas las materias que dicta el profesor
        const response = await ProfesoresMateria.findAll({
          where: { ProfesoreId: profesordb.id },
        });

        //Obtengo los Id's de esas materias
        const profesorMaterias = response.map((elem) => {
          const parseado = elem.toJSON();
          return parseado.MateriaId;
        });

        //Busco las materias según su Id
        const arreglo = profesorMaterias.map((elem) => {
          const respuesta = Materias.findOne({
            where: { id: elem },
          });
          return respuesta;
        });

        const resolvedArreglo = await Promise.all(arreglo);

        // Parseo los resultados
        const materias = resolvedArreglo.map((elem) => {
          const parseado = elem.toJSON();
          return parseado;
        });

        //Agrego las materias al profesor traido
        profesordb.materias = materias;
      }
      console.log(profesordb);
      if (alumnodb) {
        return alumnodb;
      } else if (profesordb) {
        return profesordb;
      } else if (admin) {
        return admin;
      }
    }
    return userData;
  } catch (firestoreError) {
    console.log(firestoreError);
    try {
      // Check if user exists in either the Alumnos or Profesores tables
      const [dbUser, dbProfesor, dbAdmin] = await Promise.all([
        Alumnos.findOne({ where: { email } }),
        Profesores.findOne({ where: { email } }),
        Admin.findOne({ where: { email } }),
      ]);
      //!BREAKPOINT
      if (dbUser && dbUser.password === password) {
        return dbUser;
      } else if (dbProfesor && dbProfesor.password === password) {
        // Traigo todas las materias que dicta el profesor
        const response = await ProfesoresMateria.findAll({
          where: { ProfesoreId: dbProfesor.id },
        });

        //Obtengo los Id's de esas materias
        const profesorMaterias = response.map((elem) => {
          const parseado = elem.toJSON();
          return parseado.MateriaId;
        });

        //Busco las materias según su Id
        const arreglo = profesorMaterias.map((elem) => {
          const respuesta = Materias.findOne({
            where: { id: elem },
          });
          return respuesta;
        });

        const resolvedArreglo = await Promise.all(arreglo);

        // Parseo los resultados
        const materias = resolvedArreglo.map((elem) => {
          const parseado = elem.toJSON();
          return parseado;
        });

        //Agrego las materias al profesor traido
        dbProfesor.materias = materias;

        //console.log("20.25 ----> ", dbProfesor);
        return dbProfesor;
      } else if (dbAdmin && dbAdmin.password === password) {
        return dbAdmin;
      } else {
        return { error: "Invalid Credentials" };
      }
    } catch (error) {
      console.log(error);
      // Check if the user is authenticated in Firebase
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.email === email) {
        return currentUser;
      } else {
        return { error: "Error Logging In" };
      }
    }
  }
};

module.exports = { postLogin };
