const {Empleado, Ingreso, Egreso} = require('../db');


const populateDb = async () => {
    const empleados = [ 
        {
            nombre: "Luciano",
            apellido: "Morea",
            dni: 36780159,
            email: "lucianommorea@gmail.com",
            fechaNacimiento: "1992/07/07",
            telefono: "22360059989",
            domicilio: "Azcuenaga 713",
            ciudad: "Mar del Plata",
            fechaAlta: "2022/05/02"
        },
        {
            nombre: "Martin",
            apellido: "Gomez",
            dni: 45589559,
            email: "martingomez@gmail.com",
            fechaNacimiento: "1998/09/09",
            telefono: "333",
            domicilio: "Piedras 123",
            ciudad: "La Plata",
            fechaAlta: "2021/02/08"
        },
        {
            nombre: "Juana",
            apellido: "Gutierrez",
            dni: 25985254,
            email: "juanagutierrez@gmail.com",
            fechaNacimiento: "1979/05/11",
            telefono: "1234",
            domicilio: "Luro 4321",
            ciudad: "Mar del Plata",
            fechaAlta: "2021/03/11"
        },
        {
            nombre: "Micaela",
            apellido: "Lapuente",
            dni: 38831617,
            email: "mica-mdq@gmail.com",
            fechaNacimiento: "1995/09/17",
            telefono: "65686",
            domicilio: "Rondeau 546",
            ciudad: "Mar del Plata",
            fechaAlta: "2021/06/11"
        },
        {
            nombre: "Santiago",
            apellido: "Ras",
            dni: 19857654,
            email: "santiagoras@gmail.com",
            fechaNacimiento: "1966/08/01",
            telefono: "65686saf",
            domicilio: "Rio Negro 546",
            ciudad: "Mar del Plata",
            fechaAlta: "2021/02/02"
        },
        {
            nombre: "Lourdes",
            apellido: "Sierra",
            dni: 40524654,
            email: "lourdessierra@gmail.com",
            fechaNacimiento: "1999/05/02",
            telefono: "65686",
            domicilio: "Belgrano 546",
            ciudad: "Mar del Plata",
            fechaAlta: "2022/01/01"
        },
        {
            nombre: "Benjamin",
            apellido: "Mendez",
            dni: 32546875,
            email: "benjamendez@gmail.com",
            fechaNacimiento: "1988/08/10",
            telefono: "65686",
            domicilio: "San Lorenzo 546",
            ciudad: "Mar del Plata",
            fechaAlta: "2019/01/01"
        },
];
//   const ingresos = [
//         {
//             idEmpleado: 1,
//             date: "2022/10/01 09:00:00"
//         },
//         {
//             idEmpleado: 1,
//             date: "2022/10/02 09:05:00"
//         },
//         {
//             idEmpleado: 2,
//             date: "2022/10/01 08:03:00"
//         },
//         {
//             idEmpleado: 3,
//             date: "2022/10/01 08:58:00"
//         },
//         {
//             idEmpleado: 3,
//             date: "2022/10/02 09:01:00"
//         },
//         {
//             idEmpleado: 3,
//             date: "2022/10/03 09:00:00"
//         },
//         {
//             idEmpleado: 4,
//             date: "2022/10/01 10:00:00"
//         },
//         {
//             idEmpleado: 6,
//             date: "2022/10/01 09:00:00"
//         },
//         {
//             idEmpleado: 6,
//             date: "2022/10/02 07:59:00"
//         },
//         {
//             idEmpleado: 7,
//             date: "2021/10/02 12:01:00"
//         },
//     ];
//     const egresos = [
//         {
//             idEmpleado: 1,
//             date: "2022/10/01 17:06:00",
//             idIngreso: 1
//         },
//         {
//             idEmpleado: 1,
//             date: "2022/10/02 16:36:00",
//             idIngreso: 2
//         },
//         {
//             idEmpleado: 2,
//             date: "2022/10/01 14:28:00",
//             idIngreso: 3
//         },
//         {
//             idEmpleado: 3,
//             date: "2022/10/01 18:01:00",
//             idIngreso: 4
//         },
//         {
//             idEmpleado: 3,
//             date: "2022/10/02 13:58:00",
//             idIngreso: 5
//         },
//         {
//             idEmpleado: 3,
//             date: "2022/10/03 12:00:00",
//             idIngreso: 6
//         },
//         {
//             idEmpleado: 4,
//             date: "2022/10/01 17:00:00",
//             idIngreso: 7
//         },
//         {
//             idEmpleado: 6,
//             date: "2022/10/01 15:08:00",
//             idIngreso: 8
//         },
//         {
//             idEmpleado: 6,
//             date: "2022/10/02 11:55:00",
//             idIngreso: 9
//         },
//         {
//             idEmpleado: 7,
//             date: "2021/10/02 19:32:00",
//             idIngreso: 10
//         },
    // ];
  try {
      await Empleado.bulkCreate(empleados);
    //   await Ingreso.bulkCreate(ingresos);
    //   await Egreso.bulkCreate(egresos);
  
      console.log("DB populated correctly");
    } catch (error) {
      console.log(error.message);
    }
}

module.exports = {
    populateDb,
}