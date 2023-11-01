import { ApiResponse } from "apisauce"

import { ApiServices } from "app/services/api"
import { GeneralApiProblem, getGeneralApiProblem } from "app/services/api/apiProblem"
import { Setting, SettingSnapshotIn, SettingSnapshotOut } from "./setting"
import { SystemSnapshotOut } from "../system/system"

export default class SettingServices extends ApiServices {
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
