const  {Profesores, Aula}  = require('../../db')


const getAllProfesores = async () => {  
    try {      
        const profesores = await Profesores.findAll({
            include: {
                model: Aula,
                attributes: ['Name'],
                through: {attributes:[]}
            }
        });

        if (profesores) { 
            const arreglo = profesores.map(profesor => {
                const respuesta = profesor.toJSON();
                return respuesta
            })
            return arreglo
        }
        return profesores
    } catch (error) {
        return {error: 'Error al importar profesores desde la Base de Datos'}
    }
}


module.exports = {
    getAllProfesores
}