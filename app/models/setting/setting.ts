import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const SettingModel = types
  .model("LoggingModel")
  .props({
    logLevel: types.optional(types.maybeNull(types.number), null),
    description: types.optional(types.maybeNull(types.string), null),
    color: types.optional(types.maybeNull(types.string), null),
    sendEmail: types.optional(types.maybeNull(types.boolean), false),
    sendSms: types.optional(types.maybeNull(types.boolean), false),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getColor() {
      return self.color
    },
  }))

export interface Setting extends Instance<typeof SettingModel> {}
export interface SettingSnapshotOut extends SnapshotOut<typeof SettingModel> {}
export interface SettingSnapshotIn extends SnapshotIn<typeof SettingModel> {}
