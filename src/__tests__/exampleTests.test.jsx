import React from "react"
import moment from "moment"
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
  describe("when nothing is passed in", () => {
    it("returns an empty string", () => {
      expect(formatDate()).toBe("")
    })
  })

  describe("when a Date is passed in", () => {
    it("returns a formatted date", () => {
      expect(formatDate(new Date("2023-01-01"))).toBe("2023-01-1")
    })
  })

  describe("when a string is passed in", () => {
    it("returns a formatted date", () => {
      expect(formatDate("2023-01-01")).toBe("2023-01-1")
    })
  })
  describe("when an invalid date string is passed in", () => {
    it("converts the string to a real date", () => {
      expect(formatDate("2023-02-31")).toBe("2023-03-3")
    })
  })
  describe("when a non date string is passed in", () => {
    it("returns an error string", () => {
      expect(formatDate("banana")).toBe("Invalid date")
    })
  })

  describe("when a number is passed in", () => {
    it("returns a formatted date", () => {
      expect(formatDate(new Date("2023-01-01").getTime())).toBe("2023-01-1")
    })
  })
  describe("when a negative number is passed in", () => {
    it("returns a formatted date", () => {
      expect(formatDate(new Date("1963-01-01").getTime())).toBe("1963-01-1")
    })
  })
  describe("when 0 is passed in", () => {
    it("returns an empty string", () => {
      expect(formatDate(0)).toBe("")
    })
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
  it("renders the user info", () => {
    const { container } = render(
      <UserInfo user={{ name: "Bob", birthday: "1990-01-01" }} />
    )

    expect(container).toHaveTextContent("Bob was born on 1990-01-1 (Monday)")
  })

  it("matches the snapshot", () => {
    const { container } = render(
      <UserInfo user={{ name: "Bob", birthday: "1990-01-02" }} />
    )

    expect(container).toMatchSnapshot()
  })
})
