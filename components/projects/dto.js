const single = (project) => ({
  id: project._id,
  title: project.title,
  description: project.description,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt,
  tasks: project.tasks,
  tasksStatus: project.tasksStatus
})

const multiple = (projects) => (
  projects.map(pr => single(pr))
)

module.exports = {
  single,
  multiple
}
