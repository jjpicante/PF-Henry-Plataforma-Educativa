const  {Profesores}  = require('../../db')



const postProfesor = async(name, apellido, nacionalidad, datebirth, email, username, password) => {
    try {
        if (await Profesores.findOne({
            where: {username: username.toLowerCase()}
            })
        ) return {error: `No se pudo completar la carga. Ya existe el username ${username}`}

        const newProfesor = await Profesores.create({
            name: name.toLowerCase(),
            apellido: apellido.toLowerCase(),
            nacionalidad: nacionalidad.toLowerCase(),
            datebirth,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: password.toLowerCase()
        })
        return {message: 'Profesor creado con éxito'}
    } catch (error) {
        return {error: 'No se pudo agregar el profesor solicitado'}
    }
}

module.exports = {postProfesor}