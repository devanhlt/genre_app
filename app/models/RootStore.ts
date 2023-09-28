import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthStoreModel } from "./auth"
import { CommonStoreModel } from "./common"
import { SystemStoreModel } from "./system"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  commonStore: types.optional(CommonStoreModel, {}),
  authStore: types.optional(AuthStoreModel, {}),
  systemStore: types.optional(SystemStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
