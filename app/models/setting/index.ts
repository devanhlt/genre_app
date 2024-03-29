import { Instance, SnapshotOut, flow, getType, toGenerator, types } from "mobx-state-tree"

import { jsonToString } from "app/utils/helpers"
import { withEnvironment } from "../extensions/with-environment"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { SettingModel } from "./setting"
import SettingServices from "./services"
import { withRootStore } from "../helpers/withRootStore"

export const SettingStoreModel = types
  .model("SettingStore")
  .props({
    settings: types.array(SettingModel),
  })
  .extend(withEnvironment) // Extend environment
  .extend(withRootStore)
  .actions(withSetPropAction)
  .views((self) => {
    return {
      get getCurrentSettings() {
        return self.settings
      },
      get getLogLevel0() {
        return self?.settings?.find((x) => x?.logLevel === 0)
      },
      get getLogLevel1() {
        return self?.settings?.find((x) => x?.logLevel === 1)
      },
      get getLogLevel2() {
        return self?.settings?.find((x) => x?.logLevel === 2)
      },
    }
  })
  .actions((self) => ({
    fetchSettings: flow(function* fetchSettings() {
      const settingServices = new SettingServices(self.rootStore)
      const response = yield* toGenerator(settingServices.getLoggingSetting())
      if (response.kind === "ok") {
        self.setProp("settings", response.logging)
      } else {
        console.tron.error(`Error fetching systems: ${jsonToString(response)}`, [])
      }
    }),

    /**
     * Update a system
     * Return true if success
     *
     */
    updateLoggingSetting: flow(function* updateLoggingSetting(
      setting: Instance<typeof SettingModel>,
    ) {
      const settingServices = new SettingServices(self.rootStore)
      const response = yield* toGenerator(settingServices.updateLoggingSetting(setting))
      return response.kind === "ok" && response.success
    }),

    reset: flow(function* reset() {
      self.setProp("settings", [])
    }),

    /**
     * Handle logout
     * Reset store
     */
    // Call when Instantiated
    afterCreate() {
      console.log("Instantiated " + getType(self).name)
    },
  }))

export interface SettingStore extends Instance<typeof SettingStoreModel> {}
export interface SettingStoreSnapshot extends SnapshotOut<typeof SettingStoreModel> {}
