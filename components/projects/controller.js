const projectModel = require('./model')
const projectDto = require('./dto')

module.exports = {

  getProjects (req, res) {
    projectModel.getProjects()
      .then((projects) => res.send(projectDto.multiple(projects)))
      .catch((err) => console.log('err: ', err))
    // .catch((err) => res.status(500).send({}))
  },

  getProject (req, res) {
    const { id } = req.params

    projectModel.getProject(id)
      .then((project) => res.send(projectDto.single(project)))
      .catch((err) => {
        res.status(404).send({ error: 'Project not found' })
        console.log('err: ', err)
      })
  },

  createProject (req, res) {
    const {
      title,
      description,
      code
    } = req.body

    if (title === '' || title === undefined) {
      res.status(400).send({ error: 'title is mandatory' })
      return
    }
    if (code === '' || code === undefined) {
      res.status(400).send({ error: 'code is mandatory' })
      return
    }
    if (code.length !== 2) {
      res.status(400).send({ error: 'code length has to be 2 characters' })
      return
    }

    const newProject = {
      title,
      description,
      code,
      tasks: []
    }

    // se hacen validaciones y si todo sale bien
    // se llama al modelo para la creacion
    // si no se levantan los errores
    projectModel.createProject(newProject)
      .then((project) => res.send({
        message: 'New project created',
        data: projectDto.single(project)
      }))
      .catch((err) => {
        console.log('err: ', err)
        res.status(500).send({ err })
      })
  },

  editProject (req, res) {
    const {
      id,
      ...data
    } = req.body

    projectModel.editProject(id, data)
      .then(() => res.status(200).send({
        message: 'Project updated',
        data
      }))
      .catch(err => console.log('err ', err))
  },

  deleteProject (req, res) {
    const { id } = req.query
    projectModel.deleteProject(id)
      .then(() => res.status(200).send({
        message: 'Project deleted'
      }))
      .catch(err => console.log('err ', err))
  }
}
