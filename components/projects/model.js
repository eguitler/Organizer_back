const Project = require('./schema')

module.exports = {

  createProject (project) {
    const newProject = new Project(project)

    return newProject.save()
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  getProjects (page, limit) {
    return Project.find({})
      .then((results) => results)
      .catch((err) => console.log('err: ', err))
  }
}
