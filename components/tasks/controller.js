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
    const { projectId } = req.params
    taskModel.filterByProject(projectId)
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
      projectId
    } = req.body

    if (title === '' || title === undefined) {
      res.status(400).send({ error: 'title is mandatory' })
      return
    }
    // if (description === '' || description === undefined) {
    //   res.status(400).send({ error: 'description is mandatory' })
    //   return
    // }
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
      parent: projectId
    }

    taskModel.create(newTask)
      .then((task) => {
        res.send({
          message: 'New task created',
          data: taskDto.single(task)
        })
      })
      .catch((err) => {
        console.log('err: ', err)
        res.status(500).send({ err })
      })
  },

  edit: (req, res) => {
    const { id } = req.params
    const data = req.body

    taskModel.edit(id, data)
      .then(() => res.status(200).send({
        message: 'Task updated',
        data
      }))
      .catch(err => {
        console.log('err ', err)
        res.status(500).send({ err })
      })
  },

  delete: (req, res) => {
    const { id } = req.params

    taskModel.delete(id)
      .then(() => res.status(200).send({
        message: 'Task deleted'
      }))
      .catch(err => {
        console.log('err ', err)
        res.status(500).send({ err })
      })
  }
}
