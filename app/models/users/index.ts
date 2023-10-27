import { Instance, SnapshotOut, flow, getType, toGenerator, types } from "mobx-state-tree"

import { jsonToString } from "app/utils/helpers"
import { withEnvironment } from "../extensions/with-environment"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserModel } from "./user"
import { usersServices } from "./services"

export const UsersStoreModel = types
  .model("SystemStore")
  .props({
    users: types.optional(types.maybeNull(types.array(UserModel)), []),
  })
  .extend(withEnvironment) // Extend environment
  // .extend(withRootStore)
  .actions(withSetPropAction)
  .views((self) => {
    return {
      get usersForList() {
        return self.users
      },
    }
  })
  .actions((self) => ({
    fetchAccounts: flow(function* fetchAccounts() {
      const response = yield* toGenerator(usersServices.getUsers())
      if (response.kind === "ok") {
        return response.users
      } else {
        console.tron.error(`Error fetching systems: ${jsonToString(response)}`, [])
        return []
      }
    }),

    /**
     * Reset model
     */
    reset: () => {
      self.setProp("users", [])
    },

    /**
     * Handle logout
     * Reset store
     */
    // Call when Instantiated
    afterCreate() {
      console.log("Instantiated " + getType(self).name)
    },
  }))

export interface UsersStore extends Instance<typeof UsersStoreModel> {}
export interface UsersStoreSnapshot extends SnapshotOut<typeof UsersStoreModel> {}
