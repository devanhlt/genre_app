import { Instance, SnapshotOut, flow, getType, toGenerator, types } from "mobx-state-tree"

import { apiSetting } from "app/services/api/setting"
import { withEnvironment } from "../extensions/with-environment"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { SettingModel } from "./setting"

export const SettingStoreModel = types
  .model("SettingStore")
  .props({
    settings: types.array(SettingModel),
  })
  .extend(withEnvironment) // Extend environment
  // .extend(withRootStore)
  .actions(withSetPropAction)
  .views((self) => {
    return {
      get getCurrentSettings() {
        return self.settings
      },
    }
  })
  .actions((self) => ({
    fetchSettings: flow(function* fetchSettings() {
      const response = yield* toGenerator(apiSetting.getSetting())
      if (response.kind === "ok") {
        self.setProp("settings", response.logging)
      } else {
        console.tron.error(`Error fetching systems: ${JSON.stringify(response)}`, [])
      }
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
