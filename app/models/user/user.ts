import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { LocationModel, Location } from "../location/location"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.identifierNumber,
    userId: types.string,
    nickname: types.maybe(types.string),
    password: types.string,
    status: types.enumeration("유저상태입니당", ["정상", "활동중지", "삭제됨"]),
    favorties: types.array(types.number),

    // location: {
    //   x: types.number,
    //   y: types.number,
    // }

    location: LocationModel,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
