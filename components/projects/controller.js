const projectModel = require('./model')
const projectDto = require('./dto')

module.exports = {

  createProject (req, res) {
    const pr = {
      title: 'New Project',
      description: 'custom description'
    }

    // se hacen validaciones y si todo sale bien
    // se llama al modelo para la creacion
    // si no se levantan los errores

    projectModel.createProject(pr)
      .then((project) => res.send(projectDto.single(project)))
      .catch((err) => console.log('err: ', err))
      // .catch((err) => res.status(500).send({}))
  },

  getProjects (req, res) {
    projectModel.getProjects()
      .then((projects) => res.send(projectDto.multiple(projects)))
      .catch((err) => console.log('err: ', err))
      // .catch((err) => res.status(500).send({}))
  }
}
