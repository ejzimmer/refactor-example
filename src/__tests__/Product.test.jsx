import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Product } from "../Product"

describe("Product", () => {
  it("matches the snapshot when seed packets is selected and no number is entered", () => {
    const { container } = render(<Product product="corn" />)

    expect(container).toMatchSnapshot()
  })
  it("matches the snapshot when seed packets is selected and a number is entered", () => {
    const { container } = render(<Product product="corn" />)

    enterNumber(4)

    expect(container).toMatchSnapshot()
  })

  it("matches the snapshot when seedlings is selected and no number is entered", () => {
    const { container } = render(<Product product="corn" />)

    selectProductType("Seedlings")

    expect(container).toMatchSnapshot()
  })
  it("matches the snapshot when seedlings is selected and a number is entered", async () => {
    const { container } = render(<Product product="corn" />)

    selectProductType("Seedlings")
    enterNumber(4)

    const postage = screen.getByText(/Postage/)
    await waitFor(() => expect(postage).toHaveTextContent(/32/))

    expect(container).toMatchSnapshot()
  })
})

const enterNumber = (number) => {
  const numberInput = screen.getByRole("spinbutton")
  userEvent.type(numberInput, `${number}`)
}
const selectProductType = (productType) => {
  const seedlings = screen.getByRole("radio", { name: productType })
  userEvent.click(seedlings)
}
