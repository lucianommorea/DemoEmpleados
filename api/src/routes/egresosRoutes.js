const { Router } = require('express');
const { postEgreso, putEgreso, getEgresoById, getAllEgresosByEmployee, getAllEgresos } = require('../controllers/egresosControllers');
const { Empleado, Ingreso, Egreso } = require('../db');
const moment = require('moment');

const router = Router();


router.post('/', async function (req, res){
    const {idEmpleado, date, idIngreso} = req.body;
    try {

        if(!idEmpleado || !date || !idIngreso) {
            return res.status(400).send({error: "No se recibieron los parámetros necesarios para registrar Egreso"});
        }
        
        let empleadoS = await Empleado.findByPk(idEmpleado);
        let ingresoS = await Ingreso.findByPk(idIngreso);

        if(!ingresoS) {
            return res.status(400).send({error: "No existe el Ingreso al que se le quiere registrar el Egreso"});
        }

        var fecha1 = moment(ingresoS.date, "YYYY-MM-DD HH:mm:ss");
        var fecha2 = moment(date, "YYYY-MM-DD HH:mm:ss");

        if(!empleadoS) {
            res.status(400).send({error: "No existe el Empleado al que se le quiere registrar el Egreso"});
        }
        else if(empleadoS.estado === 'OUT'){
            res.status(400).send({error: "El empleado no está en la empresa. No se puede registrar un nuevo Egreso"});
        }
        else if(idEmpleado !== ingresoS.empleadoId) {
            res.status(400).send({error: "El ingreso no pertenece al empleado referenciado"});
        }
        else if(fecha1 > fecha2){
            res.status(400).send({error: "El horario de egreso no puede ser menor al de ingreso"});
        }
        else{
            // let newEgreso = await postEgreso(idEmpleado, date, idIngreso);
            // res.status(200).send(newEgreso);
            await postEgreso(idEmpleado, date, idIngreso);
            res.status(200).send({success: true});
        }
    } 
    catch (error) {
        console.log('Error postEgresoRoute', error);
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const {date, idIngreso} = req.body;
    try {          
        if(!id || !date || !idIngreso){
            return res.status(400).send({error: "No se recibieron los parámetros necesarios para modificar Egreso"});
        }

        let egresoID = await Egreso.findByPk(id);
        let ingresoS = await Ingreso.findByPk(idIngreso);

        if(!egresoID){
            return res.status(400).send({error: "No existe el egreso que se quiere modificar"});
        }
        if(!ingresoS){
            return res.status(400).send({error: "No existe ese ingreso"});
        }

        var fecha1 = moment(ingresoS.date, "YYYY-MM-DD HH:mm:ss");
        var fecha2 = moment(date, "YYYY-MM-DD HH:mm:ss");

        if(fecha1 > fecha2){
            res.status(400).send({error: "El horario de egreso no puede ser menor al de ingreso"});
        }
        else{
            let modifyEgreso = await putEgreso(id, date, idIngreso)
            res.status(200).send(modifyEgreso);
        }

    } catch (error) {
        console.log('Error putEgresoRoute' + error);
    }
})

router.get('/', async (req,res) => {
    const {id, idEmpleado} = req.query
    try {
        if(id){
            const idEgreso = await getEgresoById(id)
            if(idEgreso){
                res.status(200).send(idEgreso);
            }
            else{
                res.status(400).send({error: 'Egreso no encontrado'});
            }
        }
        else if(idEmpleado){
            const employeeEgresos = await getAllEgresosByEmployee(idEmpleado);
            if(employeeEgresos.length > 0){
                res.status(200).send(employeeEgresos);
            }
            else{
                res.status(400).send({error: 'Egresos no encontrados'});
            }
        }
        else {
            let allEgresos = await getAllEgresos();
            res.status(200).send(allEgresos);
        }
    } catch (error) {
        console.log('Error getEgresosRoute' + error);
    }
})


module.exports = router