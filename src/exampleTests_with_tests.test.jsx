import { render } from "@testing-library/react"
import moment from "moment"

function formatDate(date) {
  if (!date) return ""

  return moment(date).format("yyyy-MM-d")
}

describe("formatDate", () => {
  it("handles a Date", () => {
    const myDate = new Date("2021-11-01")
    expect(formatDate(myDate)).toBe("2021-11-1")
  })

  it("handles a number", () => {
    const myDate = new Date("2021-11-01").getTime()
    expect(formatDate(myDate)).toBe("2021-11-1")
  })

  it("handles a negative number", () => {
    const myDate = -4
    expect(formatDate(myDate)).toBe("??")
  })

  it("handles a string", () => {
    const myDate = "2021-11-01"
    expect(formatDate(myDate)).toBe("2021-11-1")
  })

  it("does not handle 1/1/1970", () => {
    const myDate = new Date("1970-1-1T0:00:00.000").getTime()
    expect(formatDate(myDate)).toBe("1970-1-1")
  })

  it("handles an empty string", () => {
    expect(formatDate(null)).toBe("")
    expect(formatDate("")).toBe("")
  })
})

function UserInfo({ user }) {
  const date = formatDate(user.birthday)
  const day = moment(user.birthday).format("dddd")

  return (
    <div>
      {user.name} was born on {date} ({day})
    </div>
  )
}

describe("UserInfo", () => {
  const user = { name: "Bob", birthday: "2001-10-12" }

  it("shows the user name and birthday", () => {
    const { container } = render(<UserInfo user={user} />)

    expect(container).toHaveTextContent("??")
    // Bob was born on 2001-10-4 (Thursday)
  })

  it("matches the snapshot", () => {
    const { container } = render(<UserInfo user={user} />)

    expect(container).toMatchSnapshot()
  })
})
