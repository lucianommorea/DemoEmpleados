import { rest } from 'msw';

let activesIn = require('./activeIn.json');
let activesOut = require('./activesOut.json');
let empleados = require('./empleados.json');
let empleado = require('./empleado.json');
let empleadoObj = require('./empleadoObj.json');
let empleadoBaja = require('./empleadoBaja.json');
let empleado2 = require('./empleado2.json');
let empleado5 = require('./empleado5.json');
let ingresosEmpleado = require('./ingresoEmpleado.json');

export const handlers = [
    rest.get(`/empleados/activos`, (req, res, ctx) => {
        const search = req.url.searchParams.get('search');
        const id = req.url.searchParams.get('id');
        if(id){
            return res(
                ctx.status(200),
                ctx.json(empleado)
            )
        } 
        if(search){
            return res(
                ctx.status(200),
                ctx.json(empleado2)
            )
        }
        else{
            return res(
                ctx.status(200),
                ctx.json(empleados)
            )
        }

    }),

    rest.post(`/empleados`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({success: true})
        )
    }),
    
    rest.get(`/empleados`, (req, res, ctx) => {
        const search = req.url.searchParams.get('search');
        const id = req.url.searchParams.get('id');
        if(id){
            return res(
                ctx.status(200),
                ctx.json(empleado)
            )
        } 
        if(search){
            return res(
                ctx.status(200),
                ctx.json(empleado2)
            )
        }
        else {
            return res(
                ctx.status(200),
                ctx.json(empleados)
            )
        }
    }),

    rest.get(`/empleados/4`, (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(empleadoObj)
            )

    }),

    rest.get(`/empleados/5`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(empleado5)
        )
    }),

    rest.put(`/empleados/actividad/4`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(empleadoBaja)
        )
    }),

    rest.put(`/empleados/4`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(empleadoObj)
        )
    }),

    rest.post(`/egresos`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({success: true})
        )
    }),

    rest.post(`/ingresos`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({success: true})
        )
    }),

    rest.get(`/ingresos`, (req, res, ctx) => {
        const idEmpleado = req.url.searchParams.get('idEmpleado');
        if(idEmpleado){
            return res(
                ctx.status(200),
                ctx.json(ingresosEmpleado)
            )
        } 
    })

]