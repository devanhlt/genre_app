import { endOfDay, startOfDay, subDays } from "date-fns"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "../helpers/withSetPropAction"

// const TypeId = types.model("TypeId", {
//   timestamp: types.optional(types.maybeNull(types.number), null),
//   date: types.optional(types.maybeNull(types.number), null),
// })

export const LoggingFilterModel = types.model("LoggingFilter", {
  keyword: types.optional(types.maybeNull(types.string), ""),
  pageNumber: types.optional(types.maybeNull(types.number), 1),
  pageSize: types.optional(types.maybeNull(types.number), 10),
  pageDraw: types.optional(types.maybeNull(types.number), 1),
  fromDate: types.optional(types.maybeNull(types.Date), startOfDay(subDays(new Date(), 1))),
  toDate: types.optional(types.maybeNull(types.Date), endOfDay(new Date())),
  status: types.optional(types.maybeNull(types.string), ""),
  system: types.optional(types.maybeNull(types.string), ""),
  logType: types.optional(types.maybeNull(types.string), ""),
})

export const LoggingModel = types
  .model("LoggingModel")
  .props({
    // id: types.optional(types.maybeNull(TypeId), null),
    id: types.optional(types.maybeNull(types.string), null),
    systemName: types.optional(types.maybeNull(types.string), null),
    apiReferal: types.optional(types.maybeNull(types.string), null),
    logType: types.optional(types.maybeNull(types.string), null),
    logCode: types.optional(types.maybeNull(types.number), null),
    logLevel: types.optional(types.maybeNull(types.number), null),
    logDetail: types.optional(types.maybeNull(types.string), null),
    method: types.optional(types.maybeNull(types.string), null),
    requestParam: types.optional(types.maybeNull(types.string), null),
    requestBody: types.optional(types.maybeNull(types.string), null),
    startTime: types.optional(types.maybeNull(types.string), null),
    endTime: types.optional(types.maybeNull(types.string), null),
    status: types.optional(types.maybeNull(types.string), null),
    createdBy: types.optional(types.maybeNull(types.string), null),
    createdDate: types.optional(types.maybeNull(types.number), null),
    updatedBy: types.optional(types.maybeNull(types.string), null),
    updatedDate: types.optional(types.maybeNull(types.number), null),
    idStr: types.optional(types.maybeNull(types.string), null),
    color: types.optional(types.maybeNull(types.string), null),
  })
  .actions(withSetPropAction)
  .views((logging) => ({
    get getLogging() {
      return logging
    },
  }))

export interface Logging extends Instance<typeof LoggingModel> {}
export interface LoggingSnapshotOut extends SnapshotOut<typeof LoggingModel> {}
export interface LoggingSnapshotIn extends SnapshotIn<typeof LoggingModel> {}
