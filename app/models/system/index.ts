import { endOfDay, startOfDay, subDays } from "date-fns"
import { Instance, SnapshotOut, flow, getType, toGenerator, types } from "mobx-state-tree"

import { jsonToString } from "app/utils/helpers"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../helpers/withRootStore"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { LoggingFilterModel, LoggingModel, LoggingSnapshotIn } from "./logging"
import SystemServices from "./services"
import { SystemModel } from "./system"
import SettingServices from "../setting/services"

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

export const SystemStoreModel = types
  .model("SystemStore")
  .props({
    systems: types.array(SystemModel),
    lstSystemLogging: types.array(LoggingModel),
    isLoadingSystem: false,
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
  .extend(withRootStore)
  .actions(withSetPropAction)
  .views((self) => {
    return {
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
      get isEmptySystem() {
        return !self.systems.length
      },
    }
  })
  .actions((self) => ({
    fetchSystems: flow(function* fetchSystems() {
      self.setProp("isLoadingSystem", true)
      const systemServices = new SystemServices(self.rootStore)
      const response = yield* toGenerator(systemServices.getSystems())
      if (response.kind === "ok") {
        self.setProp("systems", response.systems)
      } else {
        console.tron.error(`Error fetching systems: ${jsonToString(response)}`, [])
      }
      self.setProp("isLoadingSystem", false)
    }),

    fetchLoggingSystems: flow(function* fetchLoggingSystems(
      loggingFiltering: Instance<typeof LoggingFilterModel>,
    ) {
      const currentFilter = { ...loggingFiltering }
      // Delete system param from the request params if choose all system
      if (currentFilter.system === ALL_SYSTEM.systemName) {
        delete currentFilter.system
      }
      const systemServices = new SystemServices(self.rootStore)
      const response = yield* toGenerator(systemServices.getLogging(currentFilter))

      if (response.kind === "ok") {
        self.setProp("lstSystemLogging", response.logging)
      } else {
        console.tron.error(`Error fetching systems: ${jsonToString(response)}`, [])
      }
    }),

    exportLogByFilter: flow(function* exportLogByFilter(
      loggingFiltering: Instance<typeof LoggingFilterModel>,
    ) {
      const systemServices = new SystemServices(self.rootStore)
      const response = yield* toGenerator(systemServices.exportLoggingByFilter(loggingFiltering))
      if (response.kind === "ok") {
        return response.logging
      } else {
        return []
      }
    }),

    exportSingleLogDetail: flow(function* exportLogByFilter(logging: LoggingSnapshotIn) {
      const systemServices = new SystemServices(self.rootStore)
      const response = yield* toGenerator(systemServices.exportSingleLogDetail(logging))
      if (response.kind === "ok") {
        return response.data
      } else {
        return ""
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
     * Update a system
     * Return true if success
     *
     */
    updateSystemConfig: flow(function* editSystemDetail(system: Instance<typeof SystemModel>) {
      const settingServices = new SettingServices(self.rootStore)
      const response = yield* toGenerator(settingServices.putSystemConfig(system))
      return response.kind === "ok" && response.success
    }),

    /**
     * Reset model
     */
    reset: flow(function* reset() {
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
      self.setProp("systems", [])
      self.setProp("isLoadingSystem", false)
      self.setProp("loggingRecordsFiltered", 0)
      self.setProp("loggingRecordsTotal", 0)
      self.setProp("loggingTotalCount", 0)
    }),

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
