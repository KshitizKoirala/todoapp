const Joi = require("@hapi/joi");
const router = require("express").Router();


// Initialize Sequelize DB
const db = require("../models/index");
const Tasks = db.Tasks;


// Get All Tasks
router.get("/", async (req, res) => {
    const tasks = await Tasks.findAll()
    // Here we are not checking the tasks object length as we need to return an empty array if null
    res.render("index", {tasks:tasks});

    // For creating an API we can directly send response as json 
    // res.send({ message: "To Do App" });
});


// Get All Tasks By Status
router.post("/getone/", async (req, res) => {
    const tasks = await Tasks.findAll({where: { task_status: req.body.task_status },})
    // Here we are not checking the tasks object length as we need to return an empty array if null
    res.render("index", {tasks:tasks});
});


// Get Single Tasks
router.get("/task/:id/", async(req, res)=>{
    const task = await Tasks.findByPk(req.params.id);
    if (!task){
        return res.status(404).render("index", {error: "No Task Found", tasks:tasks});  
    }
    // res.render("index", {task:task});
    res.render("update", {task:task});
});


// Add New Task
router.post("/add/todo/", async (req, res) => {
    const {error} = ValidateTask(req.body);
    if (error) {
        const tasks = await Tasks.findAll()
        return res.status(500).render("index", {error: error.details[0].message, tasks:tasks});
    }
    await Tasks.create(req.body)
    .then(()=>{
        console.log('Successfully Added.')
        res.redirect("/")
    })
    .catch((err)=>console.log("Err", err))
});


// Update Task
router.post("/update/todo/:id/", async(req, res)=>{
    const tasks = await Tasks.findAll();
    const task = await Tasks.findByPk(req.params.id);
    if (!task){
        return res.status(404).render("index", {error: "No Task Found", tasks:tasks});  
    }
    const {error} = ValidateTask(req.body);
    if (error) {
        const tasks = await Tasks.findAll()
        return res.status(500).render("update", {error: error.details[0].message, task:task});
    }
    task.task_name = req.body.task_name
    task.task_description = req.body.task_description
    task.task_status = req.body.task_status
    task.task_end_date_time = req.body.task_end_date_time
    
    await task.save()
    res.redirect("/");
});


// Delete Task
router.get("/delete/todo/:id/", async (req, res) => {
    const task = await Tasks.findByPk(req.params.id);
    if (!task){
        const tasks = await Tasks.findAll()
        return res.status(404).render("index", {error: "No Task Found", tasks:tasks});  
    } 

    await Tasks.destroy({ where: { id: req.params.id} })
    .then(()=>{
        console.log('Successfully Deleted.')
        res.redirect("/")
    })
    .catch((err)=>console.log("Err", err))
});



function ValidateTask(datas) {
    const schema = Joi.object({
      task_name: Joi.string().min(4).max(200).required(),
      task_description: Joi.string().min(5).required(),
      task_status: Joi.string().required(),
      task_end_date_time: Joi.date().required(),
    });
    return schema.validate(datas);
}
  

module.exports = router;
