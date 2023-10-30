import React from "react"

import renderer from "react-test-renderer"
import UserItem from "./UserItem"
import { User } from "app/models/users/user"

jest.mock("react-native-gesture-handler", () => undefined)

describe("<UserItem />", () => {
  it("renders correctly", () => {
    const user = {
      active: false,
      admin: false,
      createdBy: "Test",
      createdDate: new Date().getTime(),
      department: "TEST",
      departmentLite: "TEST",
      email: "test@gmail.com",
      fullName: "FULL NAME",
      mobile: "09xxxxxxxx",
      status: "active",
      updatedBy: "Test",
      updatedDate: new Date().getTime(),
      userName: "GVL00000",
      id: null,
    } as User
    const tree = renderer.create(<UserItem item={user} />)
    expect(tree).toMatchSnapshot()
  })
})
