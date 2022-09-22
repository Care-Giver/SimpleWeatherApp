import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TodoStoreModel } from "../todo-store/todo-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  todoStore: types.optional(TodoStoreModel,{} as any )
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
