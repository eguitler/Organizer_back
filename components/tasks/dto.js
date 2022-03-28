const single = (task) => ({
  id: task._id,
  title: task.title,
  description: task.description,
  priority: task.priority,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
  subTasks: task.subTasks,
  isSubTask: task.isSubTask,
  status: task.status
})

const multiple = (tasks) => (
  tasks.map(task => single(task))
)

module.exports = {
  single,
  multiple
}
