const {Empleado, Ingreso, Egreso} = require('../db');
const {Op} = require('sequelize');


async function postEmployee(nombre, apellido, dni, email, fechaNacimiento, telefono, domicilio, ciudad, fechaAlta) {
    
    try{
        const newEmployee = await Empleado.create({
            nombre,
            apellido,
            dni,
            email,
            fechaNacimiento,
            telefono,
            domicilio,
            ciudad,
            fechaAlta
        })
        
        return newEmployee
    } catch (error) {
        console.log('Error postEmployee', error)
    }
}

async function putEmployee(id, nombre, apellido, dni, email, fechaNacimiento, telefono, domicilio, ciudad, fechaAlta) {
  
    try {
        const updatedEmployee = await Employee.findOne({
          where: {
              id: id
          }
        });

        await updatedEmployee.update({nombre, apellido, dni, email, fechaNacimiento, telefono, domicilio, ciudad, fechaAlta});
      
        return updatedEmployee;
    } catch (error) {
        console.log('Error putEmployee', error)
    }
}


async function getAllEmployees() {    
   try{
        let employees = await Empleado.findAll({
            include: [Ingreso, Egreso],
            order: ["id"],
        })
        return employees
    }
    catch(error) {
        console.log('Error in getAllEmployees', error)
    }
}



async function getEmployeeById(id) {
    try{
        const employeeId = await Empleado.findOne({  
            where: {
                id: id
            },
            include: [Ingreso, Egreso],      
        }) 

        return employeeId
    } catch (error) {
            console.log('Error in getEmployeeById', error)
    }
}

async function getEmployeeByIdSearch(id) {
    try{
        const employeeId = await Empleado.findAll({  
            where: {
                id: id
            },
            include: [Ingreso, Egreso],      
        }) 

        return employeeId
    } catch (error) {
            console.log('Error in getEmployeeByIdSearch', error)
    }
}

async function getEmployeesByStatus(status) {
    try{
        const employeesByStatus = await Empleado.findAll({  
            where: {
                estado: status
            },
            include: [Ingreso, Egreso],
            order: ["id"],      
        }) 

        return employeesByStatus
    } catch (error) {
            console.log('Error in getEmployeesByStatus', error)
    }
}

async function getEmployeesByName(apellido) {
    try{
        const employeesByStatus = await Empleado.findAll({  
            where: {
                apellido: {
                    [Op.iLike]: `%${apellido}%`
                }
            }   
        }) 

        return employeesByStatus
    } catch (error) {
            console.log('Error in getEmployeesByStatus', error)
    }
}

module.exports = {
    postEmployee,
    putEmployee,
    getAllEmployees,
    getEmployeeById,
    getEmployeesByStatus,
    getEmployeesByName,
    getEmployeeByIdSearch
}
