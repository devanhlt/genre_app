import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * This represents an episode of React Native Radio.
 */
export const SystemModel = types
  .model("System")
  .props({
    guid: types.identifier,
    systemName: "",
    baseUrl: "",
    adminEmail: "",
    adminPhone: "",
    totalLog: "",
    totalLogInfo: "",
    totalLogWarn: "",
    totalLogError: "",
    receiveLog: "",
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
