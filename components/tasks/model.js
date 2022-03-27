const projectModel = require('../projects/model')
const taskModel = require('../tasks/model')
const Task = require('./schema')

module.exports = {

  all: (page, limit) => {
    return Task.find({})
      .then((results) => results)
      .catch((err) => console.log('err: ', err))
  },

  filterByProject: (projectCode) => {
    return Task.find({ projectCode: projectCode })
      .then(tasks => tasks)
      .catch((err) => console.log('err: ', err))
  },

  create: async (task) => {
    const newTask = new Task(task)

    const taskPop = await Task.populate(newTask, { path: 'parent' })
    const parent = taskPop.parent

    const projectCode = parent.code
    const count = parent.tasksCount
    const countFourDigits = String(count).padStart(4, '0')
    newTask.code = `${projectCode}-${countFourDigits}`

    async function addTaskToProject () {
      parent.tasks.push(newTask._id)
      parent.tasksCount++
      parent.save()
    }

    return newTask.save()
      .then((result) => {
        addTaskToProject()
        return result
      })
      .catch((err) => console.log('err: ', err))
  },

  edit: async (code, data) => {
    const task = await Task.findOne({ code: code })
    const taskPop = await Task.populate(task, { path: 'parent' })
    const parent = taskPop.parent

    if (data.status) {
      data.status = parent.tasksStatus.find(st => {
        return st.name === data.status
      })
    }

    return Task.updateOne({ code: code }, data)
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  delete: async (code) => {
    const task = await Task.findOne({ code: code })
    const taskPop = await Task.populate(task, { path: 'parent' })
    const parent = taskPop.parent

    parent.tasks = parent.tasks.filter(taskId => !taskId.equals(task._id))

    return Task.deleteOne({ code: code })
      .then(result => {
        parent.save()
        return result
      })
      .catch(err => console.log('err: ', err))
  }
}
