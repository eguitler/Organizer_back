const Project = require('./schema')

module.exports = {

  getProjects(page, limit) {
    return Project.find({})
      .then((results) => results)
      .catch((err) => console.log('err: ', err))
  },

  getProject(id) {
    return Project.findById(id)
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  createProject(project) {
    const newProject = new Project(project)

    return newProject.save()
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  editProject(id, data) {
    return Project.updateOne({ _id: id }, data)
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  deleteProject(id) {
    return Project.deleteOne({ _id: id })
      .then(result => result)
      .catch(err => console.log('err: ', err))
  }

}
