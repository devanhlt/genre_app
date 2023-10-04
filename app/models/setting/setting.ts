import { Instance, SnapshotIn, SnapshotOut, flow, toGenerator, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { apiSetting } from "app/services/api/setting"
import { jsonToString } from "app/utils/helpers"

export const SettingModel = types
  .model("LoggingModel")
  .props({
    logLevel: types.optional(types.maybeNull(types.number), null),
    description: types.optional(types.maybeNull(types.string), null),
    color: types.optional(types.maybeNull(types.string), null),
    sendEmail: types.optional(types.maybeNull(types.boolean), false),
    sendSms: types.optional(types.maybeNull(types.boolean), false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    editLoggingDetail: flow(function* editSystemDetail(setting: Instance<typeof SettingModel>) {
      const response = yield* toGenerator(apiSetting.putLoggingSetting(setting))
      if (response.kind === "ok" && response.success === true) {
        self.setProp("logLevel", setting.logLevel)
        self.setProp("description", setting.description)
        self.setProp("color", setting.color)
      } else {
        console.tron.error(`Error editing system: ${jsonToString(response)}`, [])
      }
    }),
    editLoggingSendEmail: flow(function* editSystemReceiveLog(
      setting: Instance<typeof SettingModel>,
    ) {
      const response = yield* toGenerator(apiSetting.putLoggingSetting(setting))
      if (response.kind === "ok" && response.success === true) {
        self.setProp("sendEmail", setting.sendEmail)
      } else {
        console.tron.error(`Error editing system: ${jsonToString(response)}`, [])
      }
    }),
    editLoggingSendSMS: flow(function* editSystemReceiveLog(
      setting: Instance<typeof SettingModel>,
    ) {
      const response = yield* toGenerator(apiSetting.putLoggingSetting(setting))
      if (response.kind === "ok" && response.success === true) {
        self.setProp("sendSms", setting.sendSms)
      } else {
        console.tron.error(`Error editing system: ${jsonToString(response)}`, [])
      }
    }),
  }))
  .views((self) => ({
    get getColor() {
      return self.color
    },
  }))

export interface Setting extends Instance<typeof SettingModel> {}
export interface SettingSnapshotOut extends SnapshotOut<typeof SettingModel> {}
export interface SettingSnapshotIn extends SnapshotIn<typeof SettingModel> {}
