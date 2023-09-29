import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * This represents an episode of React Native Radio.
 */
export const SystemModel = types
  .model("System")
  .props({
    systemName: types.optional(types.maybeNull(types.string), null),
    baseUrl: types.optional(types.maybeNull(types.string), null),
    adminEmail: types.optional(types.maybeNull(types.string), null),
    adminPhone: types.optional(types.maybeNull(types.string), null),
    totalLog: types.optional(types.maybeNull(types.number), null),
    totalLogInfo: types.optional(types.maybeNull(types.number), null),
    totalLogWarn: types.optional(types.maybeNull(types.number), null),
    totalLogError: types.optional(types.maybeNull(types.number), null),
    receiveLog: types.optional(types.maybeNull(types.boolean), false),
  })
  .actions(withSetPropAction)
  .views((system) => ({
    get getSystem() {
      return system
    },
  }))

export interface System extends Instance<typeof SystemModel> {}
export interface SystemSnapshotOut extends SnapshotOut<typeof SystemModel> {}
export interface SystemSnapshotIn extends SnapshotIn<typeof SystemModel> {}
