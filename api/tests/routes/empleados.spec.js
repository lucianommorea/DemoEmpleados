/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../../src/app.js');
const { postEgreso } = require('../../src/controllers/egresosControllers.js');
const { postEmployee } = require('../../src/controllers/empleadosControllers.js');
const { postIngreso } = require('../../src/controllers/ingresosControllers.js');
const { empleados, ingresos, egresos, newEmployee, newEmployeeDuplicateDni, incompleteEmployee, modifyNomApe, modifyDniEmail,
    modifyFechaNac, modifyRest, newIngreso, newIngresoIN, errorIngreso, errorIngresoEmpleado, modifyIngreso, modifyIngresoError,
    newEgreso, newEgresoOUT, errorEgreso, errorEgresoEmpleado, newEgresoIngreso, newEgresoNot,newEgresoErrorDate, modifyEgreso,
    modifyEgresoErrorDate, modifyEgresoErrorIngreso, modifyEgresoError } = require('../pruebas')
const { Empleado, Ingreso, Egreso, conn } = require('../../src/db.js');

    beforeAll( async () => {
        await conn.authenticate();
    });

    beforeEach( async () => {
        await conn.sync({ force: true });
        await postEmployee(empleados[0].nombre, empleados[0].apellido, empleados[0].dni, empleados[0].email, empleados[0].fechaNacimiento, empleados[0].telefono, empleados[0].domicilio, empleados[0].ciudad, empleados[0].fechaAlta)
        await postEmployee(empleados[1].nombre, empleados[1].apellido, empleados[1].dni, empleados[1].email, empleados[1].fechaNacimiento, empleados[1].telefono, empleados[1].domicilio, empleados[1].ciudad, empleados[1].fechaAlta)
        await postEmployee(empleados[2].nombre, empleados[2].apellido, empleados[2].dni, empleados[2].email, empleados[2].fechaNacimiento, empleados[2].telefono, empleados[2].domicilio, empleados[2].ciudad, empleados[2].fechaAlta)
        await postIngreso(ingresos[0].idEmpleado, ingresos[0].date);
        await postEgreso(egresos[0].idEmpleado, egresos[0].date, egresos[0].idIngreso);
        await postIngreso(ingresos[1].idEmpleado, ingresos[1].date);
        await postEgreso(egresos[1].idEmpleado, egresos[1].date, egresos[1].idIngreso);
        await postIngreso(ingresos[2].idEmpleado, ingresos[2].date);
        await postEgreso(egresos[2].idEmpleado, egresos[2].date, egresos[2].idIngreso);
        await postIngreso(ingresos[3].idEmpleado, ingresos[3].date);
    });
    
    afterEach( async () => {;
        
        // for(let empleado of empleados){
        //     await Empleado.destroy({
        //         where: {
        //             dni: empleado.dni
        //         }
        //     })
        // }

        // for(let ingreso of ingresos){
        //     await Ingreso.destroy({
        //         where: {
        //             date: ingreso.date
        //         }
        //     })
        // }

        // for(let egreso of egresos){
        //     await Egreso.destroy({
        //         where: {
        //             date: egreso.date
        //         }
        //     })
        // }
    });

    afterAll( async () => {
        await conn.close();
    });
    

describe('/empleados routes', () => {
    
    describe('GET /empleados', () => {

        it('should get 200', async () => {
            const response = await request(app).get('/empleados');
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('should return an array', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body).toBeInstanceOf(Array);
        });
        
        it('length should be 3', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body.length).toBe(empleados.length);
        });

        it('nombre empleado 1', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[0].nombre).toBe(empleados[0].nombre);
        });

        it('apellido empleado 2', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[1].apellido).toBe(empleados[1].apellido);
        });

        it('dni empleado 3', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[2].dni).toBe(empleados[2].dni);
        });

        it('email empleado 3', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[2].email).toBe(empleados[2].email);
        });

        it('fechaNacimiento empleado 2', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[1].fechaNacimiento).toContain(empleados[1].fechaNacimiento.replaceAll('/', '-'));
        });

        it('telefono empleado 1', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[0].telefono).toBe(empleados[0].telefono);
        });

        it('domicilio empleado 1', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[0].domicilio).toBe(empleados[0].domicilio);
        });

        it('ciudad empleado 2', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[1].ciudad).toBe(empleados[1].ciudad);
        });

        it('fechaAlta empleado 3', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[2].fechaAlta).toContain(empleados[2].fechaAlta.replaceAll('/', '-'));
        });
        
        it('empleado 1 y 2 están fuera de la empresa', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[0].estado).toBe('OUT');
            expect(response.body[1].estado).toBe('OUT');
        });

        it('empleado 3 está en la empresa', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[2].estado).toBe('IN');
        });

        it('Longitud del Array Ingresos del empleado 2, debe ser 0', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[1].ingresos.length).toBeFalsy();
        });

        it('Longitud del Array Ingresos de cada empleado debe ser correcto', async () => {
            const response = await request(app).get('/empleados');
            response.body.forEach( emp => {
                expect(emp.ingresos.length).toBe(ingresos.filter(ing => ing.idEmpleado === emp.id).length);
            })
        });

        it('Longitud del Array Egresos del empleado 2, debe ser 0', async () => {
            const response = await request(app).get('/empleados');
            expect(response.body[1].ingresos.length).toBeFalsy();
        });

        it('Longitud del Array Egresos de cada empleado debe ser correcto', async () => {
            const response = await request(app).get('/empleados');
            response.body.forEach( emp => {
                expect(emp.egresos.length).toBe(egresos.filter(egr => egr.idEmpleado === emp.id).length);
            })
        });

        it('Array vacío si no hay empleados', async () => {

            for(empleado of empleados){
                await Empleado.destroy({
                    where: {
                        dni: empleado.dni
                    }
                })
            }
            const response = await request(app).get('/empleados');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeFalsy();
        })

    });

    describe('POST /empleados', () => {
    
        it('should get 200', async () => {
            const response = await request(app).post('/empleados').send(newEmployee);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('should return an object', async () => {
            const response = await request(app).post('/empleados').send(newEmployee);
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
        });
        
        it('length should be 4', async () => {
            await request(app).post('/empleados').send(newEmployee);
            const response = await request(app).get('/empleados');
            expect(response.body.length).toBe(empleados.length+1);
        });
    
        it('nombre empleado 4', async () => {
            await request(app).post('/empleados').send(newEmployee);
            const response = await request(app).get('/empleados');
            expect(response.body[3].nombre).toBe(newEmployee.nombre);
        });

        it('empleado 4 está fuera de la empresa', async () => {
            await request(app).post('/empleados').send(newEmployee);
            const response = await request(app).get('/empleados');
            expect(response.body[3].estado).toBe('OUT');
        });

        it('Empleado 4, no debe tener ingresos ni egresos', async () => {
            await request(app).post('/empleados').send(newEmployee);
            const response = await request(app).get('/empleados');
            expect(response.body[3].ingresos.length).toBeFalsy();
            expect(response.body[3].egresos.length).toBeFalsy();
        });

        it('should get 400 with duplicated dni', async () => {
            const response = await request(app).post('/empleados').send(newEmployeeDuplicateDni);
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/Ya existe una persona con ese DNI en la base de datos/i)
        });

        it('should get 400 without dni', async () => {
            const response = await request(app).post('/empleados').send(incompleteEmployee);
            expect(response.status).toBe(400);
            expect(response.body.error).toBe("No se recibieron los parámetros para crear el empleado")
        });
            
    });

    describe('PUT /empleados/:id', () => {
    
        it('should get 200', async () => {
            const response = await request(app).put('/empleados/1').send(modifyNomApe);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('devuelve un objeto', async () => {
            const response = await request(app).put('/empleados/2').send(modifyDniEmail);
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
        });
        
        it('length should be 3', async () => {
            await request(app).put('/empleados/3').send(modifyFechaNac);
            const response = await request(app).get('/empleados');
            expect(response.body.length).toBe(empleados.length);
        });
    
        it('nombre y apellido modificados empleado 1', async () => {
            await request(app).put('/empleados/1').send(modifyNomApe);
            const response = await request(app).get('/empleados');
            expect(response.body[0].nombre).toBe(modifyNomApe.nombre);
            expect(response.body[0].apellido).toBe(modifyNomApe.apellido);
            expect(response.body[0].domicilio).toBe(empleados[0].domicilio);
        });

        it('dni y email modificados empleado 2', async () => {
            await request(app).put('/empleados/2').send(modifyDniEmail);
            const response = await request(app).get('/empleados');
            expect(response.body[1].dni).toBe(modifyDniEmail.dni);
            expect(response.body[1].email).toBe(modifyDniEmail.email);
            expect(response.body[1].domicilio).toBe(empleados[1].domicilio);
        });

        it('fecha nacimiento modificada empleado 3', async () => {
            await request(app).put('/empleados/3').send(modifyFechaNac);
            const response = await request(app).get('/empleados');
            expect(response.body[2].fechaNacimiento).toContain(modifyFechaNac.fechaNacimiento.replaceAll('/', '-'));
            expect(response.body[2].domicilio).toBe(empleados[2].domicilio);
        });

        it('modificada campos varios empleado 3', async () => {
            await request(app).put('/empleados/3').send(modifyRest);
            const response = await request(app).get('/empleados');
            expect(response.body[2].fechaAlta).toContain(modifyRest.fechaAlta.replaceAll('/', '-'));
            expect(response.body[2].telefono).toBe(modifyRest.telefono);            
            expect(response.body[2].domicilio).toBe(modifyRest.domicilio);            
            expect(response.body[2].ciudad).toBe(modifyRest.ciudad);
            expect(response.body[2].fechaNacimiento).toContain(empleados[2].fechaNacimiento.replaceAll('/', '-'));
        });

        it('ID no existe en base de datos', async () => {
            const response = await request(app).put('/empleados/122').send(modifyNomApe);
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/no existe id en base de datos/i);
        });
        
    });

});

describe('/ingresos routes', () => {
    
    describe('GET /ingresos', () => {

        it('should get 200', async () => {
            const response = await request(app).get('/ingresos');
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('devuelve un array', async () => {
            const response = await request(app).get('/ingresos');
            expect(response.body).toBeInstanceOf(Array);
        });

        it('length should be 4', async () => {
            const response = await request(app).get('/ingresos');
            expect(response.body.length).toBe(ingresos.length);
        });

        it('debe tener propiedad empleado que sea un objeto', async () => {
            const response = await request(app).get('/ingresos');
            response.body.forEach( ing => {
                expect(ing.empleado).not.toBeInstanceOf(Array);
                expect(ing.empleado).toBeInstanceOf(Object);
                expect(ing.empleado).toBeTruthy();
            })  
        })

        it('debe ser correcta propiedad isIn', async () => {
            const response = await request(app).get('/ingresos');
            response.body.forEach( ing => {
                expect(ing.isIn).toBeTruthy();
                if(ing.egreso === null) expect(ing.isIn).toBe('IN');
                else expect(ing.isIn).toBe('OUT');
            })  
        })

        it('debe retornar un objeto en busqueda por id', async () => {
            for(ingreso of ingresos){
                const response = await request(app).get(`/ingresos?id=${ingresos.indexOf(ingreso)+1}`);
                expect(response.body).not.toBeInstanceOf(Array);
                expect(response.body).toBeInstanceOf(Object);
            }
        });

        it('debe retornar objeto correcto en busqueda por id', async () => {
            for(ingreso of ingresos){
                const response = await request(app).get(`/ingresos?id=${ingresos.indexOf(ingreso)+1}`);
                expect(response.body.id).toBe(ingresos.indexOf(ingreso)+1);
            }
        });

        it('si el id pasado no existe, devuelve un 400', async () => {
            const response = await request(app).get('/ingresos?id=120');
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/ingreso no encontrado/i);
        });

        it('debe retornar un array en busqueda por idEmpleado ', async () => {
            for(empleado of empleados){
                const response = await request(app).get(`/ingresos?idEmpleado=${empleados.indexOf(empleado)+1}`);
                if(response.hasOwnProperty('error')){
                    expect(response.body).toBeInstanceOf(Object); 
                } else {
                    expect(response.body).toBeInstanceOf(Array); 
                }
            }
        });

        it('debe retornar longitud correcta en busqueda por idEmpleado', async () => {
            for(emp of empleados){
                const response = await request(app).get(`/ingresos?idEmpleado=${empleados.indexOf(emp)+1}`);
                if(Array.isArray(response.body)){
                    expect(response.body.length).toBe(ingresos.filter(ing => ing.idEmpleado === empleados.indexOf(emp)+1).length);
                }
            }
        });

        it('si el idEmpleado pasado no existe, devuelve un 400', async () => {
            const response = await request(app).get('/ingresos?idEmpleado=120');
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/ingresos no encontrados/i);
        });

    });

    describe('POST /ingresos', () => {
    
        it('should get 200', async () => {
            const response = await request(app).post('/ingresos').send(newIngreso);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('devuelve un objeto', async () => {
            const response = await request(app).post('/ingresos').send(newIngreso);
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
        });
        
        it('length should be 5', async () => {
            await request(app).post('/ingresos').send(newIngreso);
            const response = await request(app).get('/ingresos');
            expect(response.body.length).toBe(ingresos.length+1);
        });

        it('ingreso agregado no debe tener egresos y estar IN tanto el empleado como el ingreso', async () => {
            await request(app).post('/ingresos').send(newIngreso);
            const response = await request(app).get('/ingresos?id=5');
            expect(response.body.egreso).toBeNull();
            expect(response.body.isIn).toBe('IN');
            const response2 = await request(app).get('/empleados/2');
            expect(response2.body.estado).toBe('IN');
        });

        it('ingreso sin parámetros obligatorios', async () => {
            const response = await request(app).post('/ingresos').send(errorIngreso);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/No se recibieron los parámetros necesarios para registrar Ingreso/i);
        });

        it('ingreso con idEmpleado que no existe', async () => {
            const response = await request(app).post('/ingresos').send(errorIngresoEmpleado);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/No existe el Empleado al que se le quiere registrar el Ingreso/i);
        });

        it('ingreso con idEmpleado que no existe', async () => {
            const response = await request(app).post('/ingresos').send(newIngresoIN);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/El empleado ya está en la empresa. No se puede registrar un nuevo Ingreso/i);
        });
    
    });

    describe('PUT ingresos/:id', () => {
    
        it('should get 200', async () => {
            const response = await request(app).put('/ingresos/4').send(modifyIngreso);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('devuelve un objeto', async () => {
            const response = await request(app).put('/ingresos/4').send(modifyIngreso);
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
        });
        
        it('length should be 4', async () => {
            await request(app).put('/ingresos/4').send(modifyIngreso);
            const response = await request(app).get('/ingresos');
            expect(response.body.length).toBe(ingresos.length);
        });

        it('date modificada ingreso 4', async () => {
            await request(app).put('/ingresos/4').send(modifyIngreso);
            const response = await request(app).get('/ingresos?id=4');
            expect(response.body.date).toContain(modifyIngreso.date.slice(0, 4));
            expect(response.body.date).toContain(modifyIngreso.date.slice(5, 7));
            expect(response.body.date).toContain(modifyIngreso.date.slice(8, 10));
            expect(response.body.date).toContain(modifyIngreso.date.slice(11, 13));
            expect(response.body.date).toContain(modifyIngreso.date.slice(14, 16));
            expect(response.body.isIn).toBe('IN');
        });

        it('error 400, ID no existe en base de datos', async () => {
            const response = await request(app).put('/ingresos/122').send(modifyIngreso);
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/No existe ese ingreso/i);
        });

        it('error 400, no se pasan parametros necesarios', async () => {
            const response = await request(app).put('/ingresos/4').send(modifyIngresoError);
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/No se recibieron los parámetros necesarios para modificar Ingreso/i);
        });
            
        it('error 400, ingreso ya egresado', async () => {
            const response = await request(app).put('/ingresos/1').send(modifyIngreso);
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/No se puede modificar un Ingreso que ya fue egresado/i);
        });
    });

    describe('DELETE ingresos/:id', () => {
    
        it('should get 200', async () => {
            const response = await request(app).delete('/ingresos/4');
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('devuelve un objeto', async () => {
            const response = await request(app).delete('/ingresos/4');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
        });
        
        it('elimina ingreso sin egreso asociado', async () => {
            await request(app).delete('/ingresos/4');
            const response = await request(app).get('/ingresos');
            const response2 = await request(app).get('/egresos');
            expect(response.body.length).toBe(ingresos.length-1);
            expect(response2.body.length).toBe(egresos.length);
        });

        it('elimina ingreso con egreso asociado', async () => {
            await request(app).delete('/ingresos/1');
            const response = await request(app).get('/ingresos');
            const response2 = await request(app).get('/egresos');
            expect(response.body.length).toBe(ingresos.length-1);
            expect(response2.body.length).toBe(egresos.length-1);
        });

        it('error 400, ID no existe en base de datos', async () => {
            const response = await request(app).delete('/ingresos/50');
            expect(response.status).toBe(400);
            expect(response.body.error).not.toMatch(/No existe el Ingreso que se quiere eliminaro/i);
        });
            
    });
});

describe('/egresos routes', () => {
    
    describe('GET /egresos', () => {

        it('should get 200', async () => {
            const response = await request(app).get('/egresos');
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('devuelve un array', async () => {
            const response = await request(app).get('/egresos');
            expect(response.body).toBeInstanceOf(Array);
        });

        it('length should be 3', async () => {
            const response = await request(app).get('/egresos');
            expect(response.body.length).toBe(egresos.length);
        });

        it('debe tener propiedad empleado que sea un objeto', async () => {
            const response = await request(app).get('/egresos');
            response.body.forEach( egr => {
                expect(egr.empleado).not.toBeInstanceOf(Array);
                expect(egr.empleado).toBeInstanceOf(Object);
                expect(egr.empleado).toBeTruthy();
            })  
        })

        it('debe ser correcta propiedad isIn del ingreso relacionado', async () => {
            const response = await request(app).get('/egresos');
            response.body.forEach( egr => {
                expect(egr.ingreso).toBeTruthy();
                expect(egr.ingreso.isIn).toBe('OUT');
            })  
        })

        it('debe retornar un objeto en busqueda por id', async () => {
            for(egreso of egresos){
                const response = await request(app).get(`/egresos?id=${egresos.indexOf(egreso)+1}`);
                expect(response.body).not.toBeInstanceOf(Array);
                expect(response.body).toBeInstanceOf(Object);
            }
        });

        it('debe retornar objeto correcto en busqueda por id', async () => {
            for(egreso of egresos){
                const response = await request(app).get(`/egresos?id=${egresos.indexOf(egreso)+1}`);
                expect(response.body.id).toBe(egresos.indexOf(egreso)+1);
            }
        });

        it('si el id pasado no existe, devuelve un 400', async () => {
            const response = await request(app).get('/egresos?id=120');
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/egreso no encontrado/i);
        });

        it('debe retornar un array en busqueda por idEmpleado ', async () => {
            for(empleado of empleados){
                const response = await request(app).get(`/egresos?idEmpleado=${empleados.indexOf(empleado)+1}`);
                if(response.hasOwnProperty('error')){
                    expect(response.body).toBeInstanceOf(Object); 
                } else {
                    expect(response.body).toBeInstanceOf(Array); 
                }
            }
        });

        it('debe retornar longitud correcta en busqueda por idEmpleado', async () => {
            for(emp of empleados){
                const response = await request(app).get(`/egresos?idEmpleado=${empleados.indexOf(emp)+1}`);
                if(Array.isArray(response.body)){
                    expect(response.body.length).toBe(egresos.filter(egr => egr.idEmpleado === empleados.indexOf(emp)+1).length);
                }
            }
        });

        it('si el idEmpleado pasado no existe, devuelve un 400', async () => {
            const response = await request(app).get('/egresos?idEmpleado=120');
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/egresos no encontrados/i);
        });

    });

    describe('POST /egresos', () => {

        it('should get 200', async () => {
            const response = await request(app).post('/egresos').send(newEgreso);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('devuelve un objeto', async () => {
            const response = await request(app).post('/egresos').send(newEgreso);
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
        });
        
        it('length should be 4', async () => {
            await request(app).post('/egresos').send(newEgreso);
            const response = await request(app).get('/egresos');
            expect(response.body.length).toBe(egresos.length+1);
        });

        it('egreso agregado debe pasar el estado del empleado y el del ingreso a OUT', async () => {
            await request(app).post('/egresos').send(newEgreso);
            const response = await request(app).get('/ingresos?id=3');
            expect(response.body.egreso).toBeTruthy();
            expect(response.body.isIn).toBe('OUT');
            const response2 = await request(app).get('/empleados/2');
            expect(response2.body.estado).toBe('OUT');
        });

        it('egreso sin parámetros obligatorios', async () => {
            const response = await request(app).post('/egresos').send(errorEgreso);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/No se recibieron los parámetros necesarios para registrar Egreso/i);
        });

        it('egreso con idEmpleado que no existe', async () => {
            const response = await request(app).post('/egresos').send(errorEgresoEmpleado);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/No existe el Empleado al que se le quiere registrar el Egreso/i);
        });

        it('egreso con idIngreso que no existe', async () => {
            const response = await request(app).post('/egresos').send(newEgresoIngreso);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/No existe el Ingreso al que se le quiere registrar el Egreso/i);
        });

        it('egreso con empleado que está fuera de la empresa', async () => {
            const response = await request(app).post('/egresos').send(newEgresoOUT);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/El empleado no está en la empresa. No se puede registrar un nuevo Egreso/i);
        });

        it('egreso con ingreso referenciado que no corresponde con empleado', async () => {
            const response = await request(app).post('/egresos').send(newEgresoNot);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/El ingreso no pertenece al empleado referenciado/i);
        });

        it('egreso anterior a ingreso referenciado', async () => {
            const response = await request(app).post('/egresos').send(newEgresoErrorDate);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/El horario de egreso no puede ser menor al de ingreso/i);
        });
    
    });

    describe('PUT egresos/:id', () => {
    
        it('should get 200', async () => {
            const response = await request(app).put('/egresos/3').send(modifyEgreso);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        
        it('devuelve un objeto', async () => {
            const response = await request(app).put('/egresos/3').send(modifyEgreso);
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
        });
        
        it('length should be 3', async () => {
            await request(app).put('/egresos/3').send(modifyEgreso);
            const response = await request(app).get('/egresos');
            expect(response.body.length).toBe(egresos.length);
        });

        it('date modificada egreso 3', async () => {
            await request(app).put('/egresos/3').send(modifyEgreso);
            const response = await request(app).get('/egresos?id=3');
            expect(response.body.date).toContain(modifyEgreso.date.slice(0, 4));
            expect(response.body.date).toContain(modifyEgreso.date.slice(5, 7));
            expect(response.body.date).toContain(modifyEgreso.date.slice(8, 10));
            expect(response.body.date).toContain(modifyEgreso.date.slice(11, 13));
            expect(response.body.date).toContain(modifyEgreso.date.slice(14, 16));
            expect(response.body.ingreso.isIn).toBe('OUT');
        });

        it('error 400, no se pasan parametros necesarios', async () => {
            const response = await request(app).put('/egresos/3').send(modifyEgresoError);
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/No se recibieron los parámetros necesarios para modificar Egreso/i);
        });

        it('error 400, IDIngreso no existe en base de datos', async () => {
            const response = await request(app).put('/egresos/3').send(modifyEgresoErrorIngreso);
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/No existe ese ingreso/i);
        });

        it('error 400, egreso anterior a ingreso referenciado', async () => {
            const response = await request(app).put('/egresos/3').send(modifyEgresoErrorDate);
            expect(response.status).toBe(400);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body).not.toBeInstanceOf(Array);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.error).toMatch(/El horario de egreso no puede ser menor al de ingreso/i);
        });

        it('error 400, IDIngreso no existe en base de datos', async () => {
            const response = await request(app).put('/egresos/120').send(modifyEgreso);
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/No existe el egreso que se quiere modificar/i);
        });
            
    });

});


    