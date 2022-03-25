const taskModel = require('./model')
const taskDto = require('./dto')

module.exports = {

  getTasks (req, res) {
    const { projectCode } = req.params
    // console.log('>>>>>>>>>>>>> projectCode bool', req.params)

    if (projectCode !== undefined) {
      // console.log('>>>>>>>>>>>>> INSIDE projectCode', projectCode)
      taskModel.getTasksByProjectCode(projectCode)
        .then((tasks) => {
          // console.log('>>>>>>>>>>>>>> TASK : ', tasks)
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

  // getTasksByProjectCode (req, res) {
  //   const { projectCode } = req.body
  //   taskModel.getTasksByProjectCode(projectCode)
  //     .then((tasks) => res.send(taskDto.multiple(tasks)))
  //     .catch((err) => console.log('err: ', err))
  //   // .catch((err) => res.status(500).send({}))
  // },

  async createTask (req, res) {
    const {
      title,
      description,
      priority,
      projectCode
    } = req.body

    console.log(' >>>>>>>>>>>>>>>>>> BODY: ', req.body)
    if (title === '' || title === undefined) {
      res.status(400).send({ error: 'title is mandatory' })
      return
    }
    if (description === '' || description === undefined) {
      res.status(400).send({ error: 'description is mandatory' })
      return
    }
    if (projectCode === '' || projectCode === undefined) {
      res.status(400).send({ error: 'projectCode is mandatory' })
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

    async function getNextCode () {
      const tasks = await taskModel.getTasksByProjectCode(projectCode)
      const count = tasks.length + 1
      const countFourDigits = String(count).padStart(4, '0')
      // const prefix = await taskModel.getPrefixCodeByprojectCode(parentId)
      const code = `${projectCode}-${countFourDigits}`
      return code
    }

    const newTask = {
      title,
      description,
      priority,
      subTasks: [],
      isSubTask: false,
      code: await getNextCode(),
      projectCode
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
