 const express = require('express');
 const router = express.Router()
 const path = require('path')
 const ROLES_lIST =require('../../config/roles_list')
 const verifyRoles =require('../../middleware/verifyRoles') 
//  const verifyJWT = require('../../middleware/verifyJwt')

 const employeesController = require('../../controllers/employeesController');
const Roles_list = require('../../config/roles_list');
//  const data ={}
//  data.empoyess = require('../../model/employees.json')
//  console.log(data)

 router.route('/')
            .get(employeesController.getAll)
            .post(verifyRoles(ROLES_lIST.Admin,ROLES_lIST.Editor), employeesController.createNewEmployee)
            .put(verifyRoles(ROLES_lIST.Admin,ROLES_lIST.Editor), employeesController.updateEmployee)
            .delete(verifyRoles(ROLES_lIST.Admin),employeesController.deleteEmployee);

            router.route('/:id')
             .get(employeesController.getEmployees)



//  ! before using mvc model controller views
//  const data ={}
//  data.empoyess = require('../../model/employees.json')
//  console.log(data)
//  router.route('/')
//             .get((req,res)=>{
//                 res.json(data.empoyess)
//             })
//             .post((req,res)=>{
//                 res.json({
//                     'firstname': req.body.firstname,
//                     'lastname': req.body.lastname
//                 })
//             })
//             .put((req,res)=>{
//                 res.json({
//                     'firstname': req.body.firstname,
//                     'lastname': req.body.lastname
//                 })
//             })
//             .delete((req,res)=>{
//                 res.json({
//                     'id':req.body.id
//                 })
//             });

//             router.route('/:id')
//              .get((req,res)=>{
//                 res.json({
//                     'id':req.params.id
//                 })
//              })
 

module.exports = router