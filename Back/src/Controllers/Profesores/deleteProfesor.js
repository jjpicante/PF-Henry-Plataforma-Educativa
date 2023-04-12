const  {Profesores}  = require('../../db')


const deleteProfesor = async(username) => {          //!Revisar con qué variable se va a eliminar
    try {
        await Profesores.destroy({
            where: {username}
        });
        return {message: `Profesor eliminado con éxito`} 
    } catch (error) {
        return {error: 'No se pudo eliminar el profesor solicitado'}
    }
}


module.exports = {deleteProfesor}