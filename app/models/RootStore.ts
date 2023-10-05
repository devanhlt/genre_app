import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthStore, AuthStoreModel } from "./auth"
import { CommonStore, CommonStoreModel } from "./common"
import { SettingStore, SettingStoreModel } from "./setting"
import { SystemStore, SystemStoreModel } from "./system"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  commonStore: types.optional(CommonStoreModel, {}),
  authStore: types.optional(AuthStoreModel, {}),
  systemStore: types.optional(SystemStoreModel, {}),
  settingStore: types.optional(SettingStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface IRootStore {
  commonStore: CommonStore
  authStore: AuthStore
  systemStore: SystemStore
  settingStore: SettingStore
}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
