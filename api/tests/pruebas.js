

const empleados = [ 
    {
        nombre: "Prueba 1",
        apellido: "11",
        dni: 1,
        email: "prueba1@gmail.com",
        fechaNacimiento: "1992/07/07",
        telefono: "22360059989",
        domicilio: "Rafael de Riego 146",
        ciudad: "Mar del Plata",
        fechaAlta: "2022/05/02"
    },
    {
        nombre: "Prueba 2",
        apellido: "22",
        dni: 2,
        email: "prueba2@gmail.com",
        fechaNacimiento: "1998/09/09",
        telefono: "333",
        domicilio: "Piedras 123",
        ciudad: "La Plata",
        fechaAlta: "2021/02/08"
    },
    {
        nombre: "Prueba 3",
        apellido: "33",
        dni: 3,
        email: "prueba3@gmail.com",
        fechaNacimiento: "1979/05/11",
        telefono: "1234",
        domicilio: "Luro 4321",
        ciudad: "Mar del Plata",
        fechaAlta: "2021/03/11"
    }
];

const ingresos = [
        {
            idEmpleado: 1,
            date: "2022/10/01 09:00:00"
        },
        {
            idEmpleado: 3,
            date: "2022/10/01 08:58:00"
        },
        {
            idEmpleado: 3,
            date: "2022/10/02 09:01:00"
        },
        {
            idEmpleado: 3,
            date: "2022/10/03 09:00:00"
        }
];

const egresos = [
        {
            idEmpleado: 1,
            date: "2022/10/01 17:06:00",
            idIngreso: 1
        },
        {
            idEmpleado: 3,
            date: "2022/10/01 18:01:00",
            idIngreso: 2
        },
        {
            idEmpleado: 3,
            date: "2022/10/02 13:58:00",
            idIngreso: 3
        }
];

let newEmployee = {
                    nombre: "Prueba 4",
                    apellido: "44",
                    dni: 4,
                    email: "prueba4@gmail.com",
                    fechaNacimiento: "1995/02/07",
                    telefono: "22360059989",
                    domicilio: "Maipu 123",
                    ciudad: "Mar del Plata",
                    fechaAlta: "2022/07/02"
}

let newEmployeeDuplicateDni = {
                                nombre: "Prueba 4",
                                apellido: "44",
                                dni: 3,
                                email: "prueba4@gmail.com",
                                fechaNacimiento: "1995/02/07",
                                telefono: "22360059989",
                                domicilio: "Maipu 123",
                                ciudad: "Mar del Plata",
                                fechaAlta: "2022/07/02"
}

let incompleteEmployee = {
                            nombre: "Prueba 4",
                            apellido: "44",
                            email: "prueba4@gmail.com",
                            fechaNacimiento: "1995/02/07",
                            telefono: "22360059989",
                            domicilio: "Maipu 123",
                            ciudad: "Mar del Plata",
                            fechaAlta: "2022/07/02"
}

let modifyNomApe= { nombre: "Prueba 4", apellido: "44"}

let modifyDniEmail = {dni: 3, email: "prueba4@gmail.com"}

let modifyFechaNac = {fechaNacimiento: "1995/02/07"}

let modifyRest = {  telefono: "22360059989",
                    domicilio: "Maipu 123",
                    ciudad: "Mar del Plata",
                    fechaAlta: "2022/07/02"
}

let newIngreso = { idEmpleado: 2, date: "2023/01/01 09:00:00" }

let newIngresoIN = { idEmpleado: 3, date: "2023/01/01 09:00:00" }

let errorIngreso = { idEmpleado: 3 }

let errorIngresoEmpleado = { idEmpleado: 150, date: "2023/01/01 18:00:00" } 

let modifyIngreso = { date: "2023/01/01 09:00:00" }

let modifyIngresoError = {}

let newEgreso = { idEmpleado: 3, date: "2023/01/01 09:00:00", idIngreso: 4 }

let newEgresoOUT = { idEmpleado: 2, date: "2023/01/01 09:00:00", idIngreso: 1 }

let errorEgreso = { idEmpleado: 3 }

let errorEgresoEmpleado = { idEmpleado: 150, date: "2023/01/01 18:00:00", idIngreso: 1 } 

let newEgresoIngreso = { idEmpleado: 2, date: "2023/01/01 09:00:00", idIngreso: 8 }

let newEgresoNot = { idEmpleado: 3, date: "2023/01/01 09:00:00", idIngreso: 1 }

let newEgresoErrorDate = { idEmpleado: 3, date: "2020/01/01 09:00:00", idIngreso: 4 }

let modifyEgreso = { date: "2023/01/01 09:00:00", idIngreso: 3 }

let modifyEgresoErrorDate = { date: "2021/01/01 09:00:00", idIngreso: 3 }

let modifyEgresoErrorIngreso = { date: "2021/01/01 09:00:00", idIngreso: 20 }

let modifyEgresoError = { date: "2023/01/01 09:00:00" }

module.exports = {  empleados,
                    ingresos, 
                    egresos,
                    newEmployee,
                    newEmployeeDuplicateDni,
                    incompleteEmployee,
                    modifyNomApe,
                    modifyDniEmail,
                    modifyFechaNac,
                    modifyRest,
                    newIngreso,
                    newIngresoIN,
                    errorIngreso,
                    errorIngresoEmpleado,
                    modifyIngreso,
                    modifyIngresoError,
                    newEgreso,
                    newEgresoOUT,
                    errorEgreso,
                    errorEgresoEmpleado,
                    newEgresoIngreso,
                    newEgresoNot,
                    newEgresoErrorDate,
                    modifyEgreso,
                    modifyEgresoErrorDate,
                    modifyEgresoErrorIngreso,
                    modifyEgresoError
}


