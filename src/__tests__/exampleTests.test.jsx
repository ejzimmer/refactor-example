import React from "react"
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
