/* eslint-disable no-use-before-define */
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withRootStore } from "../helpers/withRootStore"
import { withSetPropAction } from "../helpers/withSetPropAction"

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
  .actions(withSetPropAction)
  .views((self) => ({
    get getCurrentSystem() {
      return self
    },
    get getCurrentHeaderColor() {
      const { settingStore } = self.rootStore

      if (self.totalLogError > 0) {
        return settingStore.getLogLevel2?.color || "#D32F2F"
      } else if (self.totalLogWarn > 0) {
        return settingStore.getLogLevel1?.color || "#FBC02D"
      } else if (self.totalLogInfo > 0) {
        return settingStore.getLogLevel0?.color || "#388E3C"
      } else if (self.totalLogInfo === 0 && self.totalLogError === 0 && self.totalLogWarn === 0) {
        return settingStore.getLogLevel1?.color || "#FBC02D"
      }
      return "#FFFFFF"
    },
  }))
  .actions((self) => ({
    onUpdate(system: System) {
      self.setProp("systemName", system.systemName)
      self.setProp("baseUrl", system.baseUrl)
      self.setProp("adminEmail", system.adminEmail)
      self.setProp("adminPhone", system.adminPhone)
      self.setProp("receiveLog", system.receiveLog)
    },
  }))

export interface System extends Instance<typeof SystemModel> {}
export interface SystemSnapshotOut extends SnapshotOut<typeof SystemModel> {}
export interface SystemSnapshotIn extends SnapshotIn<typeof SystemModel> {}
