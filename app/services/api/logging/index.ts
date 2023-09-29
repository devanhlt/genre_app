import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { LoggingSnapshotIn } from "app/models/system/logging"

import Config from "../../../config"
import type { ApiConfig } from "../api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem"
import { ApiSystemLoggingResponse, FilterLoggingPayload } from "./logging.api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class LoggingApi {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of system
   */
  async exportLoggingByFilter(
    filtering: FilterLoggingPayload,
  ): Promise<{ kind: "ok"; logging: LoggingSnapshotIn[] } | GeneralApiProblem> {
    // make the api call

    const response: ApiResponse<ApiSystemLoggingResponse> = await this.apisauce.post(
      `api/v1/system-logging/download/files`,
      { ...filtering },
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

  /**
   * Gets a list of system
   */
  async getLogging(
    filtering: FilterLoggingPayload,
  ): Promise<{ kind: "ok"; logging: LoggingSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiSystemLoggingResponse> = await this.apisauce.get(
      `api/v1/system-logging/search?keyword=${filtering.keyword}&pageDraw=${
        filtering.pageDraw
      }&pageNumber=${filtering.pageNumber}&pageSize=${
        filtering.pageSize
      }&fromDate=${encodeURIComponent(
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

// Singleton instance of the API for convenience
export const apiLogging = new LoggingApi()
