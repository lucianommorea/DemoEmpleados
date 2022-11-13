const {Empleado, Ingreso, Egreso} = require('../db');
const moment = require('moment');

async function postEgreso(idEmpleado, date, idIngreso) {
    
    try{
        
        let ingresoRef = await Ingreso.findByPk(idIngreso);
        let localDate = moment(date).subtract(3, 'h');
        let fecha1 = moment(ingresoRef.date, "YYYY-MM-DD HH:mm:ss");
        let fecha2 = moment(localDate, "YYYY-MM-DD HH:mm:ss");
        let diff = fecha2.diff(fecha1, 'h'); 
        let diffM = fecha2.diff(fecha1, 'm');
        let minutes = diffM % 60;
        let horasMinTrabajadas = `${diff} hs. ${minutes} minutos`;
        let masOchoHoras = diffM > 480 ? true : false

        const newEgreso = await Egreso.create({
            date: localDate,
            idIngreso,
            horasTrabajadas: diff,
            horasMinTrabajadas,
            masOchoHoras
        });
        
        await ingresoRef.update({   horasTrabajadas: parseInt(diff), 
                                    isIn: 'OUT', 
                                    idEgreso: newEgreso.id, 
                                    horasMinTrabajadas: horasMinTrabajadas,
                                    masOchoHoras: masOchoHoras});

        const employee = await Empleado.findByPk(idEmpleado);

        await employee.update({estado: 'OUT'});

        newEgreso.setEmpleado(employee);
        newEgreso.setIngreso(ingresoRef);
        
        return newEgreso;
    } catch (error) {
        console.log('Error postEgreso', error);
    }
}

async function putEgreso(id, date, idIngreso) {
  
    try {

        let ingresoRef = await Ingreso.findByPk(idIngreso);
        var fecha1 = moment(ingresoRef.date, "YYYY-MM-DD HH:mm:ss");
        var fecha2 = moment(date, "YYYY-MM-DD HH:mm:ss");
        var diff = fecha2.diff(fecha1, 'h'); // Diff in hours

        const updatedEgreso = await Egreso.findOne({
          where: {
              id: id
          }
        });

        await ingresoRef.update({horasTrabajadas: diff});

        await updatedEgreso.update({date, horasTrabajadas: diff});
        
      
        return updatedEgreso;
    } catch (error) {
        console.log('Error putEgreso', error);
    }
}


async function getAllEgresos() {    
   try{
        let egresos = await Egreso.findAll({
            include: [Empleado, Ingreso],
            order: [ ["id", "DESC" ] ],
        });
        return egresos;
    }
    catch(error) {
        console.log('Error in getAllEgresos', error);
    }
}

async function getAllEgresosByEmployee(idEmpleado) {    
    try{
         let egresosByEmployee = await Egreso.findAll({
            where: {
                empleadoId: idEmpleado
            },
            include: [Empleado, Ingreso],
            order: [ ["id", "DESC" ] ],
         });
         return egresosByEmployee;
     }
     catch(error) {
         console.log('Error in getAllEgresosByEmployee', error);
     }
 }


async function getEgresoById(id) {
    try{
        const egresoId = await Egreso.findOne({  
            where: {
                id: id
            },
            include: [Empleado, Ingreso],      
        });

        return egresoId;
    } catch (error) {
            console.log('Error in getEgresoById', error);
    }
}


module.exports = {
    postEgreso,
    putEgreso,
    getAllEgresos,
    getAllEgresosByEmployee,
    getEgresoById
}
