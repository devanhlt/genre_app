import { api } from "app/services/api"
import { Instance, SnapshotOut, flow, getType, toGenerator, types } from "mobx-state-tree"

import { withEnvironment } from "../extensions/with-environment"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { SystemModel } from "./system"

export interface IHospital {
  code: string
  name: string
}

export const SystemStoreModel = types
  .model("SystemStore")
  .props({
    systems: types.array(SystemModel),
  })
  .extend(withEnvironment) // Extend environment
  // .extend(withRootStore)
  .actions(withSetPropAction)
  .views((self) => {
    return {
      get isGlobalLoading() {
        return self
      },
      get systemsForList() {
        return self.systems
      },
    }
  })
  .actions((self) => ({
    fetchSystems: flow(function* fetchSystems() {
      const response = yield* toGenerator(api.getSystems())
      if (response.kind === "ok") {
        self.setProp("systems", response.systems)
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

export interface SystemStore extends Instance<typeof SystemStoreModel> {}
export interface SystemStoreSnapshot extends SnapshotOut<typeof SystemStoreModel> {}
