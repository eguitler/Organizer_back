const single = (project) => ({
  id: project._id,
  title: project.title,
  description: project.description,
  code: project.code,
  priority: project.priority,
  createdAt: project.createdAt,
  tasks: project.tasks
})

const multiple = (projects) => (
  projects.map(pr => single(pr))
)

module.exports = {
  single,
  multiple
}
