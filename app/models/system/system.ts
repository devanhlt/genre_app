import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withRootStore } from "../helpers/withRootStore"
import { Setting } from "../setting/setting"

export const SystemModel = types
  .model("System")
  .extend(withRootStore)
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
  .views((self) => ({
    get getCurrentSystem() {
      return self
    },
    get getCurrentHeaderColor() {
      const { settingStore } = self.rootStore

      if (self.totalLogError > 0) {
        const settingLv2 = settingStore?.getCurrentSettings?.find((x: Setting) => x?.logLevel === 2)
        return settingLv2?.color || "#D32F2F"
      } else if (self.totalLogWarn > 0) {
        const settingLv1 = settingStore?.getCurrentSettings?.find((x: Setting) => x?.logLevel === 1)
        return settingLv1?.color || "#FBC02D"
      } else if (self.totalLogInfo > 0) {
        const settingLv0 = settingStore?.getCurrentSettings?.find((x: Setting) => x?.logLevel === 0)
        return settingLv0?.color || "#388E3C"
      } else if (self.totalLogInfo === 0 && self.totalLogError === 0 && self.totalLogWarn === 0) {
        return "#FBC02D"
      }
      return "#FFFFFF"
    },
  }))

export interface System extends Instance<typeof SystemModel> {}
export interface SystemSnapshotOut extends SnapshotOut<typeof SystemModel> {}
export interface SystemSnapshotIn extends SnapshotIn<typeof SystemModel> {}
