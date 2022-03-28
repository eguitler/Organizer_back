const projectModel = require('./model')
const projectDto = require('./dto')

module.exports = {

  all: (req, res) => {
    projectModel.all()
      .then((projects) => res.send(projectDto.multiple(projects)))
      .catch((err) => {
        console.log('err: ', err)
        res.status(500).send({})
      })
  },

  find: (req, res) => {
    const { id } = req.params
    projectModel.find(id)
      .then((project) => res.send(projectDto.single(project)))
      .catch((err) => {
        res.status(404).send({ error: 'Project not found' })
        console.log('err: ', err)
      })
  },

  create: (req, res) => {
    const {
      title,
      description
    } = req.body

    if (title === '' || title === undefined) {
      res.status(400).send({ error: 'title is mandatory' })
      return
    }

    const newProject = {
      title,
      description
    }

    // se hacen validaciones y si todo sale bien
    // se llama al modelo para la creacion
    // si no se levantan los errores
    projectModel.create(newProject)
      .then((project) => res.send({
        message: 'New project created',
        data: projectDto.single(project)
      }))
      .catch((err) => {
        console.log('err: ', err)
        res.status(500).send({ err })
      })
  },

  edit: (req, res) => {
    const { id } = req.params
    const data = req.body

    projectModel.edit(id, data)
      .then(() => res.status(200).send({
        message: 'Project updated',
        data
      }))
      .catch(err => {
        console.log('err ', err)
        res.status(500).send({ err })
      })
  },

  delete: (req, res) => {
    const { id } = req.params

    projectModel.delete(id)
      .then(() => res.status(200).send({
        message: 'Project deleted'
      }))
      .catch(err => {
        console.log('err ', err)
        res.status(500).send({ err })
      })
  }
}
