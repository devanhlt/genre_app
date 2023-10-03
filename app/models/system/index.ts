import { api } from "app/services/api"
import { endOfDay, startOfDay, subDays } from "date-fns"
import { Instance, SnapshotOut, flow, getType, toGenerator, types } from "mobx-state-tree"

import { apiLogging } from "app/services/api/logging"
import { jsonToString } from "app/utils/helpers"
import { withEnvironment } from "../extensions/with-environment"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { LoggingModel, LoggingSnapshotIn } from "./logging"
import { SystemModel } from "./system"

const ALL_SYSTEM = {
  systemName: "ALL",
  baseUrl: null,
  adminEmail: null,
  adminPhone: null,
  totalLog: null,
  totalLogInfo: null,
  totalLogWarn: null,
  totalLogError: null,
  receiveLog: false,
}

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

export const SystemStoreModel = types
  .model("SystemStore")
  .props({
    systems: types.array(SystemModel),
    lstSystemLogging: types.array(LoggingModel),
    loggingTotalCount: types.optional(types.number, 0),
    loggingRecordsFiltered: types.optional(types.number, 0),
    loggingRecordsTotal: types.optional(types.number, 0),
    loggingFilter: types.optional(LoggingFilterModel, {
      keyword: "",
      pageNumber: 1,
      pageSize: 10,
      pageDraw: 1,
      fromDate: startOfDay(subDays(new Date(), 1)),
      toDate: endOfDay(new Date()),
      status: "",
      logType: "",
      system: "ALL",
    }),
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
      get systemsForListFilter() {
        return [ALL_SYSTEM].concat(self.systems)
      },
      get systemsLoggingForList() {
        return self.lstSystemLogging
      },

      get getLoggingCurrentFilter() {
        return {
          ...self.loggingFilter,
        }
      },
    }
  })
  .actions((self) => ({
    fetchSystems: flow(function* fetchSystems() {
      const response = yield* toGenerator(api.getSystems())
      if (response.kind === "ok") {
        self.setProp("systems", response.systems)
      } else {
        console.tron.error(`Error fetching systems: ${jsonToString(response)}`, [])
      }
    }),

    fetchLoggingSystems: flow(function* fetchLoggingSystems(
      loggingFiltering: Instance<typeof LoggingFilterModel>,
    ) {
      const currentFilter = { ...loggingFiltering }
      // Delete system param from the request params if choose all system
      if (currentFilter.system === ALL_SYSTEM.systemName) {
        delete currentFilter.system
      }
      const response = yield* toGenerator(apiLogging.getLogging(currentFilter))
      if (response.kind === "ok") {
        self.setProp("lstSystemLogging", response.logging)
      } else {
        console.tron.error(`Error fetching systems: ${jsonToString(response)}`, [])
      }
    }),

    exportLogByFilter: flow(function* exportLogByFilter(
      loggingFiltering: Instance<typeof LoggingFilterModel>,
    ) {
      const response = yield* toGenerator(apiLogging.exportLoggingByFilter(loggingFiltering))
      if (response.kind === "ok") {
        return response.logging
      } else {
        return []
      }
    }),

    exportSingleLogDetail: flow(function* exportLogByFilter(logging: LoggingSnapshotIn) {
      const response = yield* toGenerator(apiLogging.exportSingleLogDetail(logging))
      if (response.kind === "ok") {
        return response.data
      } else {
        return ""
      }
    }),

    setSystem: flow(function* setSystem(updateSystemPayload: UpdateSystemPayload) {
      const response = yield* toGenerator(api.updateSystem(updateSystemPayload))
      // eslint-disable-next-line no-empty
      if (response.kind === "ok") {
      } else {
        console.tron.error(`Error fetching systems: ${JSON.stringify(response)}`, [])
      }
    }),

    onChangeLoggingFilter: (loggingFiltering: Instance<typeof LoggingFilterModel>) => {
      self.setProp("loggingFilter", loggingFiltering)
    },

    onResetFilter: () => {
      self.setProp("loggingFilter", {
        keyword: "",
        pageNumber: 1,
        pageSize: 10,
        pageDraw: 1,
        fromDate: startOfDay(subDays(new Date(), 1)),
        toDate: endOfDay(new Date()),
        status: "",
        logType: "",
      })
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

export interface SystemStore extends Instance<typeof SystemStoreModel> {}
export interface SystemStoreSnapshot extends SnapshotOut<typeof SystemStoreModel> {}
