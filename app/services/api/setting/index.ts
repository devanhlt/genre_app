import { ApiResponse, ApisauceInstance, create } from "apisauce"

import { Setting, SettingSnapshotIn, SettingSnapshotOut } from "app/models/setting/setting"
import Config from "../../../config"
import type { ApiConfig } from "../api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem"
import { SystemSnapshotOut } from "app/models/system/system"

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
export class SettingApi {
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
  async getLoggingSetting(): Promise<
    { kind: "ok"; logging: SettingSnapshotIn[] } | GeneralApiProblem
  > {
    // make the api call
    const response: ApiResponse<Setting[]> = await this.apisauce.get(`api/v1/settings`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response?.data
      // This is where we transform the data into the shape we expect for our MST model.
      const logging: SettingSnapshotIn[] = rawData.map((raw) => ({
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
   * Update logging setting
   */
  async updateLoggingSetting(
    payload: SettingSnapshotOut,
  ): Promise<{ kind: "ok"; success: boolean } | GeneralApiProblem> {
    // make the api call

    const response: ApiResponse<boolean> = await this.apisauce.put(`api/v1/settings/update`, {
      ...payload,
    })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", success: response.data }
  }

  /**
   * Update config of a system
   */
  async putSystemConfig(
    payload: SystemSnapshotOut,
  ): Promise<{ kind: "ok"; success: boolean } | GeneralApiProblem> {
    // make the api call

    const response: ApiResponse<boolean> = await this.apisauce.put(`api/v1/systems/update`, {
      ...payload,
    })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", success: response.data }
  }
}

// Singleton instance of the API for convenience
export const apiSetting = new SettingApi()
