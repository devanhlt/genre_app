import React from "react"

import { Logging } from "app/models/system/logging"
import renderer from "react-test-renderer"
import LoggingItem from "./LoggingItem"

describe("<UserItem />", () => {
  it("renders correctly when item data is correctly", () => {
    const user = {
      id: "1",
      systemName: "EKYC",
      apiReferal: "Test",
      logType: "Test",
      logCode: 1,
      logLevel: 2,
      logDetail: "Test",
      method: "POST",
      requestParam: "Test",
      requestBody: "Test",
      startTime: "Test",
      endTime: "Test",
      status: "Test",
      createdBy: "Test",
      createdDate: 1,
      updatedBy: "Test",
      updatedDate: 1,
      idStr: "Test",
      color: "red",
    } as Logging
    const tree = renderer.create(<LoggingItem item={user} />)
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly when item is empty", () => {
    const tree = renderer.create(<LoggingItem item={null} />)
    expect(tree).toMatchSnapshot()
  })
})
