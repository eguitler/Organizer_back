const projectModel = require('../projects/model')
const taskModel = require('../tasks/model')
const Task = require('./schema')

module.exports = {

  all: (page, limit) => {
    return Task.find({})
      .then((results) => results)
      .catch((err) => console.log('err: ', err))
  },

  filterByProject: (projectId) => {
    return Task.find({ parent: projectId })
      .then(tasks => tasks)
      .catch((err) => console.log('err: ', err))
  },

  create: async (task) => {
    const newTask = new Task(task)

    const taskPop = await Task.populate(newTask, { path: 'parent' })
    const parent = taskPop.parent

    async function addTaskToProject () {
      parent.tasks.push(newTask._id)
      parent.tasksCount++
      parent.save()
    }
    console.log('>>>> _ID ', newTask._id)
    console.log('>>>> ID ', newTask.id)

    return newTask.save()
      .then((result) => {
        addTaskToProject()
        return result
      })
      .catch((err) => console.log('err: ', err))
  },

  edit: async (id, data) => {
    const task = await Task.findById(id)
    const taskPop = await Task.populate(task, { path: 'parent' })
    const parent = taskPop.parent

    if (data.status) {
      data.status = parent.tasksStatus.find(st => {
        return st.name === data.status
      })
    }

    return Task.findByIdAndUpdate(id, data)
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  delete: async (id) => {
    const task = await Task.findById(id)
    const taskPop = await Task.populate(task, { path: 'parent' })
    const parent = taskPop.parent
    parent.tasks = parent.tasks.filter(taskId => taskId !== task._id)

    return Task.findByIdAndDelete(id)
      .then(result => {
        parent.save()
        return result
      })
      .catch(err => console.log('err: ', err))
  }
}
