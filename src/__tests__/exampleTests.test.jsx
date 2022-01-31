import moment from "moment"
import { useEffect, useState } from "react"

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
