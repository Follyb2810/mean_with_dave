// !midfying the obect
// const data ={}
// data.empoyess = require('../model/employees.json')
// const data ={
//     empoyess :require('../model/employees.json'),
//     setEmployees:function(data){this.empoyess = data}

// }
// console.log(data.empoyess[1].id)
const Employee =require('../model/Employee')
const getAll=async (req,res)=>{
    // res.json(data.empoyess)
    // ! using mongoose
    const empoyess = await Employee.find() 
    if(!empoyess) return res.status(204).json({message:'Not Found'})
    res.json(empoyess)

}
const createNewEmployee = async (req,res)=>{
    

    // ! using mongoose
    if(!req?.body?.firstname || !req?.body?.lastname){
            return res.status(400).json({message:'Firstname and Lastname is required'})
    }

    try{

        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname:req.body.lastname
        })
        res.status(201).json(result)

    }catch(err){
        console.log(err)
    }

    // const newEmployess ={
    //     id : data.empoyess[data.empoyess.length-1].id + 1 || 1,
    //     firstname:req.body.firstname,
    //     lastname:req.body.lastname
    // }

    // if(!newEmployess.firstname || !newEmployess.lastname){
    //     return res.status(400).json({message:'firstname and lastname is require'})
    // }
    // data.setEmployees([...data.empoyess,newEmployess])
    // res.status(201).json(data.empoyess)
}

const updateEmployee = async (req,res)=>{
    // ! using mongoose
    if(!req?.body?.id){
        return res.status(400).json({message:`id parameter ${req.body.id} is required`})
    }
    const employee = await Employee.findOne({_id: req.body.id}).exec()
    if(!employee){
         return res.status(204).json({message:`no employee matches with ${req.body.id} not found`})
     }
     if(req.body?.firstname) employee.firstname = req.body.firstname
     if(req.body?.lastname) employee.lastname = req.body.lastname
    const result = employee.save()
    res.json(result)

     //    const employee = data.empoyess.find( emp => emp.id === parseInt(req.body.id))
//     if(!employee){
//         return res.status(400).json({message:`employee with ${req.body.id} not found`})
//     }

//     if(req.body.firstname) employee.firstname = req.body.firstname
//     if(req.body.lastname) employee.lastname = req.body.lastname
//     const filteresArray = data.empoyess.filter(emp => emp.id !== parseInt(req.body.id))
//     const unsortedArray = [...filteresArray,employee]
//     data.setEmployees(unsortedArray.sort((a,b)=> a.id > b.id?1:a.id <b.id ?-1:0))
//     res.json(data.empoyess)
}

const deleteEmployee =async (req,res)=>{
      // ! using mongoose
      if(!req?.body?.id) return res.status(400).json({message:`employee with id ${req.body.id} not found`})
      const employee = await Employee.findOne({_id: req.body.id}).exec()
      if(!employee){
           return res.status(204).json({message:`no employee matches with ${req.body.id} not found`})
       }
       const result = await employee.deleteOne({_id: req.body.id})
       res.json(result)
       // const employee = data.empoyess.find( emp => emp.id === parseInt(req.body.id))
    // if(!employee){
    //     return res.status(400).json({message:`employee with id ${req.body.id} not found`})
    // }
    // const filteresArray = data.empoyess.filter(emp => emp.id !== parseInt(req.body.id))
    // data.setEmployees([...filteresArray])
    // res.json(data.empoyess)
    
}

const getEmployees =async (req,res)=>{
    // ! using mongoose
    if(!req?.params?.id) return res.status(400).json({message:`employ not found with id is missing`})
    const employee = await Employee.findOne({_id: req.params.id}).exec()
    if(!employee){
         return res.status(204).json({message:`no employee matches with ${req.params.id} not found`})
     }
     res.json(employee)
    
    // const employee = data.empoyess.find( emp => emp.id === parseInt(req.params.id))
    // if(!employee){
    //     return res.status(400).json({message:`employee with id ${req.params.id} not found`})
    // }
    // res.send(employee)
 }

module.exports ={getAll,getEmployees,createNewEmployee,updateEmployee,deleteEmployee,}