const { Router } = require('express');
const egresosRoute = require('./egresosRoutes');
const ingresosRoute = require('./ingresosRoutes');
const empleadosRoute = require('./empleadosRoutes');

const router = Router();


router.use("/empleados", empleadosRoute)
router.use("/ingresos", ingresosRoute)
router.use("/egresos", egresosRoute)


module.exports = router;
