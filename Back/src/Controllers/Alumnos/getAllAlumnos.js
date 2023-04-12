const  {Alumnos, Aula}  = require('../../db')


const getAllAlumnos = async () => {  
    try {      
        const alumnos = await Alumnos.findAll({
            include: {
                all: true
            }
        });

        if (alumnos) { 
            const arreglo = alumnos.map(alumno => {
                const respuesta = alumno.toJSON();
                return respuesta
            })
            return arreglo
        }
        return alumnos
    } catch (error) {
        return {error: 'Error al importar alumnos desde la Base de Datos'}
    }
}


module.exports = {
    getAllAlumnos
}
