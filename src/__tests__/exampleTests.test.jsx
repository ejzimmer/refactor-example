import moment from "moment"
import { render } from "@testing-library/react"

function formatDate(date) {
  if (!date) return ""

  return moment(new Date(date)).format("yyyy-MM-D")
}

describe('formatDate', () => {
  describe('when nothing is passed in', () => {
    it('returns an empty string', () => {
      expect(formatDate()).toBe('')
    })
  })

  describe('when a Date is passed in', () => {
    it('formats the date', () => {
      expect(formatDate(new Date('2001-01-01'))).toBe('2001-01-1')
    })
  })

  describe('when a date string is passed in', () => {
    it('formats the date', () => {
      expect(formatDate('2001-01-01')).toBe('2001-01-1')
    })    
  })

  describe('when an invalid date string is passed in', () => {
    it('formats the date', () => {
      expect(formatDate('2001-02-31')).toBe('2001-03-3')
    })
  })

  describe('when a non-date string is passed in', () => {
    it('returns an error string', () => {
      expect(formatDate('banana')).toBe('Invalid date')
    })
  })

  describe('when a number is passed in', () => {
    it('formats the date', () => {
      expect(formatDate(new Date('2001-01-01').getTime())).toBe('2001-01-1')
    })    
  })

  describe('when a negative number is passed in', () => {
    it('formats the date', () => {
      expect(formatDate(new Date('1960-01-01').getTime())).toBe('1960-01-1')
    })    
  })

  describe('when 0 is passed in', () => {
    it('returns empty string', () => {
      expect(formatDate(0)).toBe('')
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

describe('UserInfo component', () => {
  it('displays the user\'s info', () => {
    const { container } = render(<UserInfo user={{ name: 'Bob', birthday: '1990-01-01'}} />)
    expect(container).toHaveTextContent('Bob was born on 1990-01-1 (Monday)')
  })
})
