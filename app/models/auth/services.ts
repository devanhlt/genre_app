import { ApiResponse } from "apisauce"

import { ApiServices } from "app/services/api"
import { GeneralApiProblem, getGeneralApiProblem } from "app/services/api/apiProblem"
import { AuthRequestModel, AuthResponseModel } from "./types"

class AuthServices extends ApiServices {
  /**
   * Login with username and password
   */
  async loggingWithUsernameAndPassword(
    authRequest: AuthRequestModel,
  ): Promise<{ kind: "ok"; data: AuthResponseModel } | GeneralApiProblem> {
    const response: ApiResponse<AuthResponseModel> = await this.apisauce.post(
      `api/v1/mobile/authenticate`,
      {
        ...authRequest,
      },
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the services for convenience
export const authServices = new AuthServices()
