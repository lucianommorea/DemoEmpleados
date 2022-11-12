const {Empleado, Ingreso, Egreso} = require('../db');
const moment = require('moment');

async function postIngreso(idEmpleado, date) {
    
    try{

        let localDate = moment(date).subtract(3, 'h');

        const newIngreso = await Ingreso.create({
            // idEmpleado,
            date: localDate
        });
        const employee = await Empleado.findByPk(idEmpleado);

        await employee.update({estado: 'IN'});

        newIngreso.setEmpleado(employee);
        
        return newIngreso;
    } catch (error) {
        console.log('Error postIngreso', error);
    }
}

async function putIngreso(id, date) {
  
    try {
        const updatedIngreso = await Ingreso.findOne({
          where: {
              id: id
          }
        });

        await updatedIngreso.update({date});
      
        return updatedIngreso;
    } catch (error) {
        console.log('Error putIngreso', error)
    }
}


async function getAllIngresos() {    
   try{
        let ingresos = await Ingreso.findAll({
            include: [Empleado, Egreso],
            order: [ ["id", "DESC" ] ],
        });
        return ingresos;
    }
    catch(error) {
        console.log('Error in getAllIngresos', error);
    }
}

async function getAllIngresosByEmployee(idEmpleado) {    
    try{
         let ingresosByEmployee = await Ingreso.findAll({
            where: {
                empleadoId: idEmpleado
            },
            include: [Empleado, Egreso],
            order: [ ["id", "DESC" ] ],
         });
         return ingresosByEmployee;
     }
     catch(error) {
         console.log('Error in getAllIngresosByEmployee', error);
     }
 }


async function getIngresoById(id) {
    try{
        const ingresoId = await Ingreso.findOne({  
            where: {
                id: id
            },
            include: [Empleado, Egreso],      
        });

        return ingresoId;
    } catch (error) {
            console.log('Error in getIngresoById', error);
    }
}


module.exports = {
    postIngreso,
    putIngreso,
    getAllIngresos,
    getAllIngresosByEmployee,
    getIngresoById
}
