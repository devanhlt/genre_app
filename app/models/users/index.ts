import { Instance, SnapshotOut, flow, getType, toGenerator, types } from "mobx-state-tree"

import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../helpers/withRootStore"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UsersServices } from "./users.services"
import { UserModel } from "./user"

export const UsersStoreModel = types
  .model("SystemStore")
  .props({
    users: types.optional(types.maybeNull(types.array(UserModel)), []),
  })
  .extend(withEnvironment) // Extend environment
  .extend(withRootStore)
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
      const usersServices = new UsersServices(self.rootStore)
      const response = yield* toGenerator(usersServices.getUsers())
      return response.kind === "ok" ? response.users : []
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
