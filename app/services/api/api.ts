import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { System, SystemSnapshotIn } from "app/models/system/system"
import Config from "../../config"
import type { ApiConfig, UpdateSystemPayload } from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"

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
   * Update config of a system
   */
  async updateSystem(payload: UpdateSystemPayload): Promise<{ kind: "ok" } | GeneralApiProblem> {
    // make the api call

    const response: ApiResponse<boolean> = await this.apisauce.put(`api/v1/system/update`, {
      ...payload,
    })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok" }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
