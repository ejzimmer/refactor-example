import { render } from "@testing-library/react"
import { format } from "date-fns"

function formatDate(date) {
  if (!date) return ""

  try {
    return format(new Date(date), "yyyy-MM-d")
  } catch (e) {
    return "Invalid date"
  }
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
    const myDate = 3 * 24 * 60 * 60 * 1000 * -1
    expect(formatDate(myDate)).toBe("1969-12-29")
  })

  it("returns an empty string when the date is 0 (1/1/1970)", () => {
    const myDate = 0
    expect(formatDate(myDate)).toBe("")
  })

  it("handles a string", () => {
    const myDate = "2021-11-01"
    expect(formatDate(myDate)).toBe("2021-11-1")
  })

  it("handles an empty string", () => {
    expect(formatDate("")).toBe("")
  })

  it("handles a string that isn't a date", () => {
    const myDate = "not a date"
    expect(formatDate(myDate)).toBe("Invalid date")
  })

  it("handles a string that isn't a valid date", () => {
    const myDate = "2021-13-04"
    expect(formatDate(myDate)).toBe("Invalid date")
  })
})

function UserInfo({ user }) {
  const date = formatDate(user.birthday)
  const day = format(new Date(user.birthday), "EEEE")

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

    expect(container).toHaveTextContent("Bob was born on 2001-10-12 (Friday)")
  })

  it("matches the snapshot", () => {
    const { container } = render(<UserInfo user={user} />)

    expect(container).toMatchSnapshot()
  })
})
