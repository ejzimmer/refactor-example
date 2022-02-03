import moment from "moment"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { render } from "@testing-library/react"

function formatDate(date) {
  if (!date) return ""

  try {
    return format(new Date(date), "yyyy-MM-d")
  } catch (e) {
    return "Invalid date"
  }
}

describe("formatDate function", () => {
  it("formats a date", () => {
    expect(formatDate(new Date("2022-02-02"))).toBe("2022-02-2")
  })

  it("formats a valid string", () => {
    expect(formatDate("2022-02-02")).toBe("2022-02-2")
  })
  it("formats a string which isn't a date", () => {
    expect(formatDate("not a date")).toBe("Invalid date")
  })
  it("formats a string which is an invalid date", () => {
    expect(formatDate("2022-02-30")).toBe("2022-03-2")
  })

  it("formats a number", () => {
    expect(formatDate(345690097)).toBe("1970-01-5")
  })
  it("formats a negative number", () => {
    expect(formatDate(-345990067)).toBe("1969-12-27")
  })
  it("formats 0", () => {
    expect(formatDate(0)).toBe("")
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

describe("UserInfo component", () => {
  it("displays the username and birthday", () => {
    const { container } = render(
      <UserInfo user={{ name: "Bob", birthday: new Date("2010-02-10") }} />
    )

    expect(container.textContent).toBe("Bob was born on 2010-02-10 (Wednesday)")
  })

  it("matches the snapshot", () => {
    const { container } = render(
      <UserInfo user={{ name: "Bob", birthday: new Date("2010-02-11") }} />
    )

    expect(container).toMatchSnapshot()
  })
})

function Increment({ initialNumber }) {
  const [number, setNumber] = useState(initialNumber)

  const incrementNumber = () => setNumber((n) => ++n)

  return (
    <>
      {number}
      <button onClick={incrementNumber}>+</button>
    </>
  )
}

function Clickymajig() {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (checked) {
      setTimeout(() => setChecked(false), 2000)
    }
  })

  return (
    <input type="checkbox" checked={checked} onClick={() => setChecked(true)} />
  )
}

describe("the test suite", () => {
  it("has at least one test", () => {
    expect(true).toBe(true)
  })
})
