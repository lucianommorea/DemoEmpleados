const { Router } = require('express');
const { postIngreso, putIngreso, getIngresoById, getAllIngresosByEmployee, getAllIngresos, deleteIngreso } = require('../controllers/ingresosControllers');
const { Empleado, Ingreso, Egreso } = require('../db');


const router = Router();


router.post('/', async function (req, res){
    const {idEmpleado, date} = req.body;
    try {
        let empleadoS = await Empleado.findByPk(idEmpleado);
        if (!idEmpleado || !date) {
            res.status(404).send({error: "No se recibieron los parámetros necesarios para registrar Ingreso"});
        }
        else if(!empleadoS) {
            res.status(404).send({error: "No existe el Empleado al que se le quiere registrar el Ingreso"});
        }
        else if(empleadoS.estado === 'IN'){
            res.status(404).send({error: "El empleado ya está en la empresa. No se puede registrar un nuevo Ingreso"});
        }
        else {
            let newIngreso = await postIngreso(idEmpleado, date);
            res.status(200).send(newIngreso);
        }
    } 
    catch (error) {
        console.log('Error postIngresoRoute', error);
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const {date} = req.body;
    try {
        if(!id || !date){
            res.status(404).send({error: "No se recibieron los parámetros necesarios para modificar Ingreso"});
        }
        let ingresoS = await Ingreso.findByPk(id);
        if(!ingresoS){
            res.status(404).send({error: "No existe ese ingreso"});
        }
        else if(ingresoS.isIn === 'OUT'){
            res.status(404).send({error: "No se puede modificar un Ingreso que ya fue egresado"});
        }
        else{
            let modifyIngreso = await putIngreso(id, date)
            res.status(200).send(modifyIngreso);
        }

    } catch (error) {
        console.log('Error putIngresoRoute' + error);
    }
})

router.get('/', async (req,res) => {
    const {id, idEmpleado} = req.query
    try {
        if(id){
            const idIngreso = await getIngresoById(id);
            if(idIngreso){
                res.status(200).send(idIngreso);
            }
            else{
                res.status(404).send('Ingreso no encontrado');
            }
        }
        else if(idEmpleado){
            const employeeIngresos = await getAllIngresosByEmployee(idEmpleado);
            if(employeeIngresos){
                res.status(200).send(employeeIngresos);
            }
            else{
                res.status(404).send('Ingresos no encontrados');
            }
        }
        else {
            let allIngresos = await getAllIngresos();
            res.status(200).send(allIngresos);
        }
    } catch (error) {
        console.log('Error getIngresosRoute' + error);;
    }
})

router.delete('/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const ingresoDeleted = await Ingreso.findByPk(id);
        if(!id){
            res.status(404).send({error: "No se recibieron los parámetros necesarios para eliminar Ingreso"});
        }
        else if(!ingresoDeleted) res.status(404).send({error: "No se recibieron los parámetros necesarios para eliminar Ingreso"});
        else{
            await deleteIngreso(id);
            res.status(200).send({ success: true })
        }

    } catch (error) {
        console.log('Error deleteIngreso' + error);
    }
})


module.exports = router