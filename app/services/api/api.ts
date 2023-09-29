import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { System, SystemSnapshotIn } from "app/models/system/system"
import Config from "../../config"
import type { ApiConfig, ApiSystemLoggingResponse } from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import { LoggingSnapshotIn } from "app/models/system/logging"

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
export class Api {
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
  async getSystems(): Promise<{ kind: "ok"; systems: SystemSnapshotIn[] } | GeneralApiProblem> {
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
      const systems: SystemSnapshotIn[] = rawData.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", systems }
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
  async getLogging(): Promise<{ kind: "ok"; logging: LoggingSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiSystemLoggingResponse> = await this.apisauce.get(
      `api/v1/system-logging/search?keyword=&pageDraw=1&pageNumber=1&pageSize=10&fromDate=2023-09-27T16%3A51%3A58.315Z&toDate=2023-09-28T16%3A51%3A58.315Z&_=1695894718201`,
    )

    console.log("response:", response)

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
export const api = new Api()
