const taskModel = require('./model')
const taskDto = require('./dto')

module.exports = {

  all: (req, res) => {
    taskModel.all()
      .then((tasks) => res.send(taskDto.multiple(tasks)))
      .catch((err) => {
        console.log('err: ', err)
        res.status(500).send({ err })
      })
  },

  filterByProject: (req, res) => {
    const { projectCode } = req.params
    taskModel.filterByProject(projectCode)
      .then((tasks) => res.send(taskDto.multiple(tasks)))
      .catch((err) => {
        console.log('err: ', err)
        res.status(500).send({ err })
      })
  },

  create: async (req, res) => {
    const {
      title,
      description,
      priority,
      projectCode, // populate this in model
      projectId
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
      const tasks = await taskModel.filterByProject(projectCode)
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
      projectCode,
      parent: projectId,
      code: await getNextCode()
    }

    // se hacen validaciones y si todo sale bien
    // se llama al modelo para la creacion
    // si no se levantan los errores
    taskModel.create(newTask)
      .then((task) => {
        console.log('>>>>>>>> ?? TASK: ', task)
        res.send({
          message: 'New task created',
          data: taskDto.single(task)
        })
      })
      .catch((err) => {
        console.log('err: ', err)
        res.status(500).send({ err })
      })
  }

}
