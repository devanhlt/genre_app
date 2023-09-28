import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UpgradePayload } from "./types"

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    loading: false,
    authToken: types.maybe(types.string),
    authEmail: "test@pv.com",
    authPassword: "12345678",
  })
  .extend(withEnvironment) // Extend environment
  .actions(withSetPropAction)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationErrors() {
      return {
        authEmail: (function () {
          if (store.authEmail.length === 0) return "can't be blank"
          if (store.authEmail.length < 6) return "must be at least 6 characters"
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
            return "must be a valid email address"
          return ""
        })(),
        authPassword: (function () {
          if (store.authPassword.length === 0) return "can't be blank"
          if (store.authPassword.length < 6) return "must be at least 6 characters"
          return ""
        })(),
      }
    },
  }))
  .actions((self) => {
    const loginWithPassword = flow(function* login() {
      self.loading = true
    })

    const setAuthToken = flow(function* login(value?: string) {
      self.authToken = value
    })

    const setAuthEmail = flow(function* login(value?: string) {
      self.authEmail = value.replace(/ /g, "")
    })

    const setAuthPassword = flow(function* login(value?: string) {
      self.authPassword = value.replace(/ /g, "")
    })

    const upgrade = flow(function* upgrade(payload: UpgradePayload) {
      return payload
    })

    /**
     * Logout function
     * Remove ....
     */
    const logout = flow(function* logout() {
      self.authToken = undefined
      self.authEmail = ""
      self.authPassword = ""
    })

    return {
      loginWithPassword,
      logout,
      upgrade,
      setAuthToken,
      setAuthEmail,
      setAuthPassword,
    }
  })
export default AuthStoreModel

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshot extends SnapshotOut<typeof AuthStoreModel> {}
