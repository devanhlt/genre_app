import { ApiResponse } from "apisauce"

import { ApiServices } from "app/services/api"
import { GeneralApiProblem, getGeneralApiProblem } from "app/services/api/apiProblem"
import { User } from "./user"

export class UsersServices extends ApiServices {
  /**
   * Gets a list of system
   */
  async getUsers(): Promise<{ kind: "ok"; users: User[] } | GeneralApiProblem> {
    // make the api call
    const timestamp = new Date().getTime()
    const response: ApiResponse<User[]> = await this.apisauce.get(`api/v1/users?_=${timestamp}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const users: User[] = rawData.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", users }
    } catch (e) {
      if (__DEV__) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}
