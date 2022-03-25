const Project = require('./schema')

module.exports = {

  getProjects (page, limit) {
    return Project.find({})
      .then((results) => results)
      .catch((err) => console.log('err: ', err))
  },

  getProject (code) {
    return Project.findOne({ code: code })
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  createProject (project) {
    const newProject = new Project(project)

    return newProject.save()
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  editProject (code, data) {
    return Project.updateOne({ code: code }, data)
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  deleteProject (code) {
    return Project.deleteOne({ code: code })
      .then(result => result)
      .catch(err => console.log('err: ', err))
  },

  addTask ({ projectCode, taskId }) {
    return Project.findOne({ code: projectCode })
      .then(project => {
        project.tasks.push(taskId)
        project.save()
      })
      .catch((err) => console.log('err: ', err))
  }
}
