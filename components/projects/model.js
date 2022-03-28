const Project = require('./schema')

module.exports = {

  all: (page, limit) => {
    return Project.find({})
      .then((results) => results)
      .catch((err) => console.log('err: ', err))
  },

  find: (id) => {
    return Project.findById(id)
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  create: (project) => {
    const newProject = new Project(project)

    return newProject.save()
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  edit: (id, data) => {
    return Project.findByIdAndUpdate(id, data)
      .then((result) => result)
      .catch((err) => console.log('err: ', err))
  },

  delete: async (id) => {
    const project = await Project.findById(id)
    const projectPop = await Project.populate(project, { path: 'tasks ' })
    const tasks = projectPop.tasks

    tasks.forEach(task => task.remove())

    return project.remove()
      .then(result => result)
      .catch(err => console.log('err: ', err))
  }
}
