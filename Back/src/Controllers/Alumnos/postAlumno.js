const { Op } = require("sequelize");
const { Alumnos, Aulas } = require("../../db");
const { auth } = require('../../config/firebase')
const { createUserWithEmailAndPassword} = require("firebase/auth");
const { createUserDocument } = require("../Firebase/createUser");


const postAlumno = async (
  name,
  apellido,
  nacionalidad,
  datebirth,
  email,
  username,
  password,
  division,
  anio
) => {
  try {
    if (
      await Alumnos.findOne({
        where: { email: email },
      })
    )
      return {
        error: `No se pudo completar la carga. Ya existe el email ${email}`,
      };
    if (
      apellido === null &&
      nacionalidad === null &&
      datebirth === null &&
      email === null &&
      username === null &&
      password === null
    ) {
      return { error: "Te faltaron datos a completar!" };
    }
    const newAlumno = {
      name: name.toLowerCase(),
      apellido: apellido.toLowerCase(),
      nacionalidad: nacionalidad.toLowerCase(),
      datebirth: datebirth,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password.toLowerCase(),
    };

    // Create a user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User created in Firebase Authentication:", user.uid);

    // Create a user document in Firestore to store additional user details
    const role = "alumno"; // Set the user's role to "alumno"
    await createUserDocument(user, name, role, email);


    // Associate the new user with the created `Alumnos` record
    const alumnodb = await Alumnos.create(newAlumno);
    alumnodb.firebaseUserId = user.uid;
    await alumnodb.save();

    /*    const foundAula = await Aulas.findOne({
         where: { [Op.and]: [{ anio: anio }, { division: division }] },
       });
       if (!foundAula) {
         return { error: "El anio o division indicado no se encuentran" };
       }
   
       alumnodb.setAula(foundAula); */
    return { message: "Alumno creado con exito" };
  } catch (error) {
    console.log(error);
    if (error.code === '/email-already-in-use') {
      return { error: 'El email ya está en uso. Por favor, seleccione otro.' };
    } else if (error.code === '/weak-password') {
      return { error: 'La contraseña es demasiado débil. Por favor, elija una contraseña más segura.' };
    } else {
      return { error: 'No se pudo agregar el Alumno solicitado' };
    }
  }
};

module.exports = { postAlumno };
