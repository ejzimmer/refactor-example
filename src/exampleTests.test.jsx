import moment from "moment"

function formatDate(date) {
  if (!date) return ""

  return moment(date).format("yyyy-MM-d")
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
