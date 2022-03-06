const single = (project) => ({
  id: project._id,
  title: project.title,
  description: project.description
})

const multiple = (projects) => (
  projects.map(pr => single(pr))
)

module.exports = {
  single,
  multiple
}