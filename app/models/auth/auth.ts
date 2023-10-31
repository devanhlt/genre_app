import { Instance, SnapshotOut, flow, toGenerator, types } from "mobx-state-tree"

import { jsonToString } from "app/utils/helpers"
import { withEnvironment } from "../extensions/with-environment"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { authServices } from "./services"
import { AuthRequestModel } from "./types"
import { Toast } from "app/utils/toast"
import { clearSessionStorage, saveSessionStorage } from "app/utils/auth"

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    loading: false,
    authToken: types.maybe(types.string),
    username: "",
  })
  .extend(withEnvironment) // Extend environment
  .actions(withSetPropAction)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationErrors() {
      return {
        username: (function () {
          if (store.username.length === 0) return "can't be blank"
          return ""
        })(),
      }
    },
  }))
  .actions((self) => {
    const loginWithUsernameAndPassword = flow(function* loginWithUsernameAndPassword(
      payload: AuthRequestModel,
    ) {
      self.loading = true

      const response = yield* toGenerator(authServices.loggingWithUsernameAndPassword(payload))

      if (response.kind === "ok") {
        self.setProp("authToken", response.data.accessToken)
        saveSessionStorage(response.data.accessToken, response.data.expiresIn)
      } else {
        // Handler error
        console.tron.error(`Error when login: ${jsonToString(response)}`, [])
        Toast.error({
          title: "Login failed",
          subtitle: jsonToString(response),
          visibilityTime: 1000,
        })
      }
    })

    /**
     * Logout function
     * Remove ....
     */
    const logout = flow(function* logout() {
      self.authToken = undefined

      // Remove local storage
      clearSessionStorage()
    })

    return {
      loginWithUsernameAndPassword,
      logout,
    }
  })
export default AuthStoreModel

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshot extends SnapshotOut<typeof AuthStoreModel> {}
