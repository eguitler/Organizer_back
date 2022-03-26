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
    const { code } = req.params
    projectModel.find(code)
      .then((project) => {
        const dto = projectDto.single(project)
        res.send(dto)
      })
      .catch((err) => {
        res.status(404).send({ error: 'Project not found' })
        console.log('err: ', err)
      })
  },

  create: (req, res) => {
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
      code
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
    const { code } = req.params
    const data = req.body

    console.log('>>> EDIT PROJECT ', code, ' --> ', req.body)
    projectModel.edit(code, data)
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
    const { code } = req.params

    projectModel.delete(code)
      .then(() => res.status(200).send({
        message: 'Project deleted'
      }))
      .catch(err => {
        console.log('err ', err)
        res.status(500).send({ err })
      })
  }
}
