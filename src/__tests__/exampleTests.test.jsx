import moment from "moment"
import { render } from "@testing-library/react"

function formatDate(date) {
  if (!date) return ""

  return moment(new Date(date)).format("yyyy-MM-D")
}

function UserInfo({ user }) {
  const date = formatDate(user.birthday)
  const day = moment(user.birthday).format("dddd")

  return (
    <div>
      {user.name} was born on {date} ({day})
    </div>
  )
}

describe("the test suite", () => {
  it("has at least one test", () => {
    expect(true).toBe(true)
  })
})
