import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Product } from '../Product'

describe('Product component', () => {
  describe('when seed packets is selected with no amount', () => {
    it('matches the snapshot', () => {
      const { container } = render(<Product product="corn" />)

      const radioButton = screen.getByRole('radio', { name: 'Seed Packets' })
      userEvent.click(radioButton)

      expect(container).toMatchSnapshot()
    })
  })

  describe('when seed packets is selected with an amount', () => {
    it('matches the snapshot', () => {
      const { container } = render(<Product product="corn" />)

      const radioButton = screen.getByRole('radio', { name: 'Seed Packets' })
      userEvent.click(radioButton)

      const input = screen.getByRole('spinbutton')
      userEvent.type(input, '4')

      expect(container).toMatchSnapshot()
    })
  })

  describe('when seedlings is selected with no amount', () => {
    it('matches the snapshot', () => {
      const { container } = render(<Product product="corn" />)

      const radioButton = screen.getByRole('radio', { name: 'Seedlings' })
      userEvent.click(radioButton)

      expect(container).toMatchSnapshot()
    })
  })

  describe('when seedlings is selected with an amount', () => {
    it('matches the snapshot', () => {
      const { container } = render(<Product product="corn" />)

      const radioButton = screen.getByRole('radio', { name: 'Seedlings' })
      userEvent.click(radioButton)

      const input = screen.getByRole('spinbutton')
      userEvent.type(input, '4')

      expect(container).toMatchSnapshot()
    })
  })

})