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

  create: (task) => {
    const newTask = new Task(task)

    async function addTaskToProject () {
      const taskPop = await Task.populate(newTask, { path: 'parent' })
      taskPop.parent.tasks.push(newTask._id)
      taskPop.parent.tasksCount++
      taskPop.parent.save()
    }

    return newTask.save()
      .then((result) => {
        console.log('>>>>>>>> ?? CREATE TASK : ', result)
        addTaskToProject()
        return result
      })
      .catch((err) => console.log('err: ', err))
  }

  // editProject (id, data) {
  //   return Project.updateOne({ _id: id }, data)
  //     .then((result) => result)
  //     .catch((err) => console.log('err: ', err))
  // },

  // deleteProject (id) {
  //   return Project.deleteOne({ _id: id })
  //     .then(result => result)
  //     .catch(err => console.log('err: ', err))
  // }

}
