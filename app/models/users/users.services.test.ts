import MockAdapter from "axios-mock-adapter"
import { loadSessionStorage } from "app/utils/auth"
import { UsersServices } from "./users.services"

jest.mock("../../utils/auth", () => ({
  loadSessionStorage: jest.fn(),
}))

describe("UsersServices", () => {
  const usersServices = new UsersServices(null, {
    url: "https://jsonplaceholder.typicode.com/",
    timeout: 1000,
  })

  test("return correctly", async () => {
    const mock = new MockAdapter(usersServices.apisauce.axiosInstance)
    ;(loadSessionStorage as jest.Mock).mockReturnValue({ accessToken: "access_token" })

    const usersResponse = [
      { email: "test1@gmail.com", fullName: "Test1" },
      { email: "test2@gmail.com", fullName: "Test2" },
    ]
    mock.onGet("api/v1/users").reply(200, usersResponse)
    const response = await usersServices.getUsers()
    expect(response.kind).toEqual("ok")
  })

  test("return problem", async () => {
    const mock = new MockAdapter(usersServices.apisauce.axiosInstance)
    ;(loadSessionStorage as jest.Mock).mockReturnValue({ accessToken: "access_token" })

    const usersResponse = [
      { email: "test1@gmail.com", fullName: "Test1" },
      { email: "test2@gmail.com", fullName: "Test2" },
    ]
    mock.onGet("api/v1/users").reply(500, usersResponse)
    const response = await usersServices.getUsers()
    expect(response.kind).toEqual("server")
  })

  test("return exception", async () => {
    const mock = new MockAdapter(usersServices.apisauce.axiosInstance)
    ;(loadSessionStorage as jest.Mock).mockReturnValue({ accessToken: "access_token" })

    mock.onGet("api/v1/users").reply(200, {})
    const response = await usersServices.getUsers()
    expect(response.kind).toEqual("bad-data")
  })
})
