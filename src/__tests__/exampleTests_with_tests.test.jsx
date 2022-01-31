import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import moment from "moment"
import { useEffect, useState } from "react"
import { act } from "react-dom/test-utils"

function formatDate(date) {
  if (!date) return ""

  return moment(new Date(date)).format("yyyy-MM-D")
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

    expect(container).toHaveTextContent("Bob was born on 2001-10-12 (Friday)")
  })

  it("matches the snapshot", () => {
    const { container } = render(<UserInfo user={user} />)

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

describe("Increment", () => {
  it("increments the number", () => {
    const { container } = render(<Increment initialNumber={4} />)

    expect(container).toMatchSnapshot()

    const button = screen.getByRole("button")
    userEvent.click(button)

    expect(container).toMatchSnapshot()
  })

  it("increments the number", () => {
    render(<Increment initialNumber={4} />)

    expect(screen.getByText("4")).toBeInTheDocument()

    const button = screen.getByRole("button")
    userEvent.click(button)

    expect(screen.getByText("5")).toBeInTheDocument()
  })
})

function Clickymajig() {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (checked) {
      setTimeout(() => setChecked(false), 3000)
    }
  })

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => setChecked(true)}
    />
  )
}

describe("Clickymajig", () => {
  it("unchecks the checkbox after 2 seconds", () => {
    jest.useFakeTimers()
    const { container } = render(<Clickymajig />)

    const checkbox = screen.getByRole("checkbox")
    userEvent.click(checkbox)

    expect(container).toMatchSnapshot()

    act(() => jest.advanceTimersByTime(2000))
    expect(container).toMatchSnapshot()

    jest.useRealTimers()
  })
})
