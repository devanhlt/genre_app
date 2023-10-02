import { api } from "app/services/api"
import { Instance, SnapshotOut, flow, getType, toGenerator, types } from "mobx-state-tree"

import { apiLogging } from "app/services/api/logging"
import { subDays } from "date-fns"
import { withEnvironment } from "../extensions/with-environment"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { LoggingModel } from "./logging"
import { SystemModel } from "./system"

export const LoggingFilterModel = types.model("LoggingFilter", {
  keyword: types.optional(types.maybeNull(types.string), ""),
  pageNumber: types.optional(types.maybeNull(types.number), 1),
  pageSize: types.optional(types.maybeNull(types.number), 10),
  pageDraw: types.optional(types.maybeNull(types.number), 1),
  fromDate: types.optional(types.maybeNull(types.Date), subDays(new Date(), 1)),
  toDate: types.optional(types.maybeNull(types.Date), new Date()),
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
      fromDate: subDays(new Date(), 1),
      toDate: new Date(),
      status: "",
      logType: "",
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
        console.tron.error(`Error fetching systems: ${JSON.stringify(response)}`, [])
      }
    }),

    fetchLoggingSystems: flow(function* fetchLoggingSystems(
      loggingFiltering: Instance<typeof LoggingFilterModel>,
    ) {
      const response = yield* toGenerator(apiLogging.getLogging(loggingFiltering))
      if (response.kind === "ok") {
        self.setProp("lstSystemLogging", response.logging)
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
        fromDate: subDays(new Date(), 1),
        toDate: new Date(),
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
