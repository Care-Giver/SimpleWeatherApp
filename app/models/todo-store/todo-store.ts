import { destroy, Instance, SnapshotOut, types } from "mobx-state-tree"
import { TodoModel, TodoSnapshot } from "../todo/todo"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty characters
 */
export const TodoStoreModel = types
  .model("TodoStore")
  .props({
    todos: types.optional(types.array(TodoModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    addTodo: (title, body) => {
      const id = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
      const createdAt = Date.now()
      const updatedAt = Date.now()
      self.todos.unshift({ id, title, body, createdAt, updatedAt })
    },
  }))
  .actions((self) => ({
    removeTodo: (todo) => {
      destroy(todo)
    },
  }))
  .views()

type TodoStoreType = Instance<typeof TodoStoreModel>
export interface TodoStore extends TodoStoreType {}
type TodoStoreSnapshotType = SnapshotOut<typeof TodoStoreModel>
export interface TodoStoreSnapshot extends TodoStoreSnapshotType {}
export const TodoracterStoreDefaultModel = () => types.optional(TodoStoreModel, {})
