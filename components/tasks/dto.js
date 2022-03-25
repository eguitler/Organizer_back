const single = (task) => ({
  id: task._id,
  title: task.title,
  description: task.description,
  priority: task.priority,
  createdAt: task.createdAt,
  parentId: task.parentId,
  subTasks: task.subTasks,
  isSubTask: task.isSubTask
})

const multiple = (tasks) => (
  tasks.map(task => single(task))
)

module.exports = {
  single,
  multiple
}
