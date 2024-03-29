const { Router } = require('express');
const { postEmployee, putEmployee, getEmployeesByStatus, getAllEmployees, getEmployeeById, getEmployeesByName, getEmployeeByIdSearch, getActiveEmployeeByIdSearch, getActiveEmployeesByName, getAllActiveEmployees, getActiveEmployeesByStatus, putEmployeeActivity, getInactiveEmployeeByIdSearch, getInactiveEmployeesByName, getAllInactiveEmployees } = require('../controllers/empleadosControllers');
const { Empleado, Ingreso, Egreso } = require('../db');


const router = Router();


router.post('/', async function (req, res){
    const {nombre, apellido, dni, email, fechaNacimiento, telefono, domicilio, ciudad, fechaAlta} = req.body;

    try {
        if (!nombre || !apellido || !dni || !email || !fechaNacimiento || !telefono || !domicilio || !ciudad || !fechaAlta) {
            res.status(400).send({error: "No se recibieron los parámetros para crear el empleado"});
            return
        }
        let existeDni = await Empleado.findOne({
            where: {
                dni: dni
            }
        });
        if (!dni || existeDni) {
            res.status(400).send({error: "Ya existe una persona con ese DNI en la base de datos"});
        }
        else {
            let newEmployee = await postEmployee(nombre, apellido, dni, email, fechaNacimiento, telefono, domicilio, ciudad, fechaAlta);
            res.status(200).send(newEmployee);
        }
    } 
    catch (error) {
        console.log('Error postEmployeeRoute', error);
    }
})

router.put('/actividad/:id', async (req,res) => {
    const {id} = req.params;
    const {situacionLaboral, fechaBaja} = req.body;
    try {
        let modifyEmployee = await putEmployeeActivity(id, situacionLaboral, fechaBaja);
        res.status(200).send(modifyEmployee);
    } catch (error) {
        console.log('Error putEmployeeActivityRoute' + error);
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const {nombre, apellido, dni, email, fechaNacimiento, telefono, domicilio, ciudad, fechaAlta, fechaBaja} = req.body;
    try {
        let existeId = await Empleado.findByPk(id);
        if (!existeId) {
            res.status(400).send({error: "No existe ID en base de datos"});
        } else {
            let modifyEmployee = await putEmployee(id, nombre, apellido, dni, email, fechaNacimiento, telefono, domicilio, ciudad, fechaAlta, fechaBaja);
            res.status(200).send(modifyEmployee);     
        }
    } catch (error) {
        console.log('Error putEmployeeRoute' + error);
    }
})

router.get('/inactivos', async (req,res) => {
    const {id, status, search} = req.query
    try {
        if(id){
            const idEmployee = await getInactiveEmployeeByIdSearch(id);
            if(idEmployee){
                res.status(200).send(idEmployee);
            }
            else{
                res.status(404).send('Employee not found');
            }
        }
        else if(search){
            const searchedEmployees = await getInactiveEmployeesByName(search);
            if(searchedEmployees){
                res.status(200).send(searchedEmployees);
            }
            else{
                res.status(404).send('Employees not found');
            }
        }  
        else {
            let allEmployees = await getAllInactiveEmployees();
            res.status(200).send(allEmployees);
        }
    } catch (error) {
        console.log('Error getInactiveEmployeesRoute' + error);;
    }
})


router.get('/activos', async (req,res) => {
    const {id, status, search} = req.query
    try {
        if(id){
            const idEmployee = await getActiveEmployeeByIdSearch(id);
            if(idEmployee){
                res.status(200).send(idEmployee);
            }
            else{
                res.status(404).send('Employee not found');
            }
        }
        else if(status){
            const statusEmployees = await getActiveEmployeesByStatus(status);
            if(statusEmployees){
                res.status(200).send(statusEmployees);
            }
            else{
                res.status(404).send('Employees not found');
            }
        }  
        else if(search){
            const searchedEmployees = await getActiveEmployeesByName(search);
            if(searchedEmployees){
                res.status(200).send(searchedEmployees);
            }
            else{
                res.status(404).send('Employees not found');
            }
        }  
        else {
            let allEmployees = await getAllActiveEmployees();
            res.status(200).send(allEmployees);
        }
    } catch (error) {
        console.log('Error getActiveEmployeesRoute' + error);;
    }
})

router.get('/:id', async (req,res) => {
    const {id} = req.params
    try {
        const idEmployee = await getEmployeeById(id);
        res.status(200).send(idEmployee);

    } catch (error) {
        console.log('Error getEmployeesRoute' + error);;
    }
})


router.get('/', async (req,res) => {
    const {id, status, search} = req.query
    try {
        if(id){
            const idEmployee = await getEmployeeByIdSearch(id);
            if(idEmployee){
                res.status(200).send(idEmployee);
            }
            else{
                res.status(404).send('Employee not found');
            }
        }
        else if(status){
            const statusEmployees = await getEmployeesByStatus(status);
            if(statusEmployees){
                res.status(200).send(statusEmployees);
            }
            else{
                res.status(404).send('Employees not found');
            }
        }  
        else if(search){
            const searchedEmployees = await getEmployeesByName(search);
            if(searchedEmployees){
                res.status(200).send(searchedEmployees);
            }
            else{
                res.status(404).send('Employees not found');
            }
        }  
        else {
            let allEmployees = await getAllEmployees();
            res.status(200).send(allEmployees);
        }
    } catch (error) {
        console.log('Error getEmployeesRoute' + error);;
    }
})



module.exports = router