import { ApiResponse } from "apisauce"

import { ApiServices } from "app/services/api"
import { GeneralApiProblem, getGeneralApiProblem } from "app/services/api/apiProblem"
import { Logging, LoggingFilterModel, LoggingSnapshotIn } from "./logging"
import { Instance } from "mobx-state-tree"
import { System } from "./system"

interface ApiSystemLoggingResponse {
  lstSystemLogging: {
    content: Logging[]
  }
  totalCount: number
  recordsFiltered: number
  recordsTotal: number
}

export default class SystemServices extends ApiServices {
  /**
   * Gets a list of system
   */
  async getSystems(): Promise<{ kind: "ok"; systems: System[] } | GeneralApiProblem> {
    // make the api call
    const timestamp = new Date().getTime()
    const response: ApiResponse<System[]> = await this.apisauce.get(`api/v1/systems?_=${timestamp}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const systems: System[] = rawData.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", systems }
    } catch (e) {
      if (__DEV__) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Export logging by current filter
   */
  async exportLoggingByFilter(
    filtering: Instance<typeof LoggingFilterModel>,
  ): Promise<{ kind: "ok"; logging: LoggingSnapshotIn[] } | GeneralApiProblem> {
    // make the api call

    const response: ApiResponse<Logging[]> = await this.apisauce.post(
      `api/v1/system-logging/download/files`,
      { ...filtering },
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response?.data

      // This is where we transform the data into the shape we expect for our MST model.
      const logging: LoggingSnapshotIn[] = rawData.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", logging }
    } catch (e) {
      if (__DEV__) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Export logging by current filter
   */
  async exportSingleLogDetail(
    logging: LoggingSnapshotIn,
  ): Promise<{ kind: "ok"; data: string } | GeneralApiProblem> {
    // make the api call

    const response: ApiResponse<string> = await this.apisauce.post(
      `api/v1/system-logging/download/file`,
      { ...logging },
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response?.data
      return { kind: "ok", data: rawData }
    } catch (e) {
      if (__DEV__) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a list of system
   */
  async getLogging(
    filtering: Instance<typeof LoggingFilterModel>,
  ): Promise<{ kind: "ok"; logging: LoggingSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiSystemLoggingResponse> = await this.apisauce.get(
      `api/v1/system-logging/search?keyword=${filtering.keyword}&pageDraw=${
        filtering.pageDraw
      }&pageNumber=${filtering.pageNumber}&logType=${filtering.logType}&system=${
        filtering.system ?? ""
      }&pageSize=${filtering.pageSize}&fromDate=${encodeURIComponent(
        filtering.fromDate.toISOString(),
      )}&toDate=${encodeURIComponent(filtering.toDate.toISOString())}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response?.data?.lstSystemLogging?.content

      // This is where we transform the data into the shape we expect for our MST model.
      const logging: LoggingSnapshotIn[] = rawData.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", logging }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}
