const Project = require('./schema')

module.exports = {

  getProjects(page, limit) {
    return Project.find({})
      .then((results) => results)
      .catch((err) => console.log('err: ', err))
  },

  createProject(project) {
    const newProject = new Project(project)

    return newProject.save()
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  editProject(id, data) {
    // const newProject = new Project(project)
    Project.updateOne({ _id: id }, data)
      .then(result => console.log('>> edit: ', result))
    // Project.findById(id)
    //   .then(result => console.log('>> edit: ', result))
    // console.log('>> EDIT: ', project)
    // return newProject.save()
    //   .then((result) => result)
    //   .catch((err) => console.log('err: ', err))
  },

  deleteProject(id) {
    return Project.deleteOne({ _id: id })
      .then(result => result)
      .catch(err => console.log('err: ', err))
  }

}
