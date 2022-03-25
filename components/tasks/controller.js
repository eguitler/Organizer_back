const taskModel = require('./model')
const taskDto = require('./dto')

module.exports = {

  getTasks (req, res) {
    const { projectId } = req.params
    console.log('>>>>>>>>>>>>> projectid bool', !!projectId)

    if (projectId !== undefined) {
      console.log('>>>>>>>>>>>>> INSIDE PROJECTID', projectId)
      taskModel.getTasksByProjectId(projectId)
        .then((tasks) => {
          console.log('>>>>>>>>>>>>>> TASK : ', tasks)
          res.send(taskDto.multiple(tasks))
        })
        .catch((err) => console.log('err: ', err))
      return
    }

    taskModel.getTasks()
      .then((tasks) => res.send(taskDto.multiple(tasks)))
      .catch((err) => console.log('err: ', err))
    // .catch((err) => res.status(500).send({}))
  },

  // getTasksByProjectId (req, res) {
  //   const { projectId } = req.body
  //   taskModel.getTasksByProjectId(projectId)
  //     .then((tasks) => res.send(taskDto.multiple(tasks)))
  //     .catch((err) => console.log('err: ', err))
  //   // .catch((err) => res.status(500).send({}))
  // },

  createTask (req, res) {
    const {
      title,
      description,
      priority,
      parentId
    } = req.body

    if (title === '' || title === undefined) {
      res.status(400).send({ error: 'title is mandatory' })
      return
    }
    if (description === '' || description === undefined) {
      res.status(400).send({ error: 'description is mandatory' })
      return
    }
    if (priority === '' || priority === undefined) {
      res.status(400).send({ error: 'priority is mandatory' })
      return
    }
    if (!Number.isInteger(priority)) {
      res.status(400).send({ error: 'priority has to be a number (integer)' })
      return
    }

    const newTask = {
      title,
      description,
      priority,
      parentId,
      subTasks: [],
      isSubTask: false
    }

    // se hacen validaciones y si todo sale bien
    // se llama al modelo para la creacion
    // si no se levantan los errores
    taskModel.createTask(newTask)
      .then((task) => res.send({
        message: 'New task created',
        data: taskDto.single(task)
      }))
      .catch((err) => {
        console.log('err: ', err)
        res.status(500).send({ err })
      })
  }

}
