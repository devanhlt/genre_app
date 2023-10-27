import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "../helpers/withSetPropAction"

export const UserModel = types
  .model("AccountModel")
  .props({
    active: types.optional(types.maybeNull(types.boolean), false),
    admin: types.optional(types.maybeNull(types.boolean), false),
    createdBy: types.optional(types.maybeNull(types.string), null),
    createdDate: types.optional(types.maybeNull(types.number), null),
    department: types.optional(types.maybeNull(types.string), null),
    departmentLite: types.optional(types.maybeNull(types.string), null),
    email: types.optional(types.maybeNull(types.string), null),
    fullName: types.optional(types.maybeNull(types.string), null),
    mobile: types.optional(types.maybeNull(types.string), null),
    status: types.optional(types.maybeNull(types.string), null),
    updatedBy: types.optional(types.maybeNull(types.string), null),
    updatedDate: types.optional(types.maybeNull(types.number), null),
    userName: types.optional(types.maybeNull(types.string), null),
    id: types.optional(
      types.maybeNull(
        types.model({
          date: types.optional(types.maybeNull(types.number), null),
          timestamp: types.optional(types.maybeNull(types.number), null),
        }),
      ),
      {
        date: null,
        timestamp: null,
      },
    ),
  })
  .actions(withSetPropAction)
  .views(() => ({}))

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
