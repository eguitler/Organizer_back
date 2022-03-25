const projectModel = require('../projects/model')
const taskModel = require('../tasks/model')
const Task = require('./schema')

module.exports = {

  getTasks (page, limit) {
    return Task.find({})
      .then((results) => results)
      .catch((err) => console.log('err: ', err))
  },

  // getProject (id) {
  //   return Project.findById(id)
  //     .then((result) => result)
  //     .catch((err) => console.log('err: ', err))
  // },

  createTask (task) {
    const newTask = new Task(task)
    projectModel.addTask({
      id: newTask.parentId,
      taskId: newTask._id
    })
    return newTask.save()
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  getTasksByProjectId (id) {
    console.log('>>>> PROJECT ID: ', id)
    return Task.find({ parentId: id })
      .then(tasks => tasks)
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
