import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { maybe } from "mobx-state-tree/dist/internal"

/**
 * Model description here for TypeScript hints.
 */
export const LocationModel = types
  .model("Location")
  .props({
    nx: types.number,
    ny: types.number,
    cityName: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type LocationType = Instance<typeof LocationModel>
export interface Location extends LocationType {}
type LocationSnapshotType = SnapshotOut<typeof LocationModel>
export interface LocationSnapshot extends LocationSnapshotType {}
export const createLocationDefaultModel = () => types.optional(LocationModel, {})
