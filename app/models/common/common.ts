import { Instance, SnapshotOut, getType, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { withSetPropAction } from "../helpers/withSetPropAction"

const Hospital = types.model("Hospital", {
  code: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  id: types.optional(types.string, ""),
})

export const CommonStoreModel = types
  .model("CommonStore")
  .props({
    hospitalList: types.optional(types.maybeNull(types.array(Hospital)), []),
    globalLoading: false,
  })
  .extend(withEnvironment) // Extend environment
  // .extend(withRootStore)
  .actions(withSetPropAction)
  .views((self) => {
    return {
      get getListOfHospitals() {
        return self.hospitalList
      },

      get isGlobalLoading() {
        return !!self.globalLoading
      },
    }
  })
  .actions((self) => ({
    /**
     * Change global loading
     *
     */
    setGlobalLoading(value?: boolean) {
      self.setProp("globalLoading", !!value)
    },
    // Call when Instantiated
    afterCreate() {
      console.log("Instantiated " + getType(self).name)
    },
  }))

export interface CommonStore extends Instance<typeof CommonStoreModel> {}
export interface CommonStoreSnapshot extends SnapshotOut<typeof CommonStoreModel> {}
