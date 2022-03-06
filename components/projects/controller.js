const projectModel = require('./model')
const projectDto = require('./dto')

module.exports = {

  getProjects(req, res) {
    projectModel.getProjects()
      .then((projects) => res.send(projectDto.multiple(projects)))
      .catch((err) => console.log('err: ', err))
    // .catch((err) => res.status(500).send({}))
  },

  createProject(req, res) {
    const {
      title,
      description
    } = req.body

    if (title === '' || title === undefined) {
      res.status(400).send({ error: 'title is mandatory' })
      return
    }
    if (description === '' || description === undefined) {
      res.status(400).send({ error: 'description is mandatory' })
      return
    }

    const newProject = {
      id: Date.now(),
      title,
      description
    }

    // se hacen validaciones y si todo sale bien
    // se llama al modelo para la creacion
    // si no se levantan los errores

    projectModel.createProject(newProject)
      .then((project) => res.send({
        msg: 'new project created',
        data: projectDto.single(project)
      }))
      .catch((err) => console.log('err: ', err))
      .catch((err) => res.status(500).send({ err }))
  },

  editProject(req, res) {
    const {
      id,
      ...data
    } = req.body
    console.log('>> ', id)
    console.log('>> ', data)

    projectModel.editProject(id, data)
    // .then(() => res.status(200).send({
    //   message: 'Project with id: ' + id + ' was updated with data: ' + data
    // }))
    // .catch(err => console.log('err ', err))
  },

  deleteProject(req, res) {
    const { id } = req.query
    projectModel.deleteProject(id)
      .then(() => res.status(200).send({
        message: 'Project with id: ' + id + ' was deleted'
      }))
      .catch(err => console.log('err ', err))
  }

}
