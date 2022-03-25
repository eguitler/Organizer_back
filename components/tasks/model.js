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
      projectCode: newTask.projectCode,
      taskId: newTask._id
    })
    return newTask.save()
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  getTasksByProjectCode (projectCode) {
    // console.log('>>>> PROJECT CODE GETTING: ', projectCode)
    return Task.find({ projectCode: projectCode })
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
