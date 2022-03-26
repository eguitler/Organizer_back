const Project = require('./schema')

module.exports = {

  all: (page, limit) => {
    return Project.find({})
      .then((results) => results)
      .catch((err) => console.log('err: ', err))
  },

  find: (code) => {
    return Project.findOne({ code: code })
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  create: (project) => {
    const newProject = new Project(project)

    return newProject.save()
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  edit: (code, data) => {
    return Project.updateOne({ code: code }, data)
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  delete: (code) => {
    return Project.deleteOne({ code: code })
      .then(result => result)
      .catch(err => console.log('err: ', err))
  }
}
