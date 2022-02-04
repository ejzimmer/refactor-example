import { render, screen } from "@testing-library/react"
import { CostLabel } from "../Product"

describe("CostLabel component", () => {
  describe("when the productType is seeds", () => {
    describe("when no amount is entered", () => {
      it("shows unit price and $0", () => {
        render(<CostLabel productType="SEED_PACKETS" count="" />)

        const label = screen.getByText(/Number of/)

        expect(label).toHaveTextContent("Number of seed packets ($4 * = $0)")
      })
    })

    describe("when an amount is entered", () => {
      it("shows unit price and the total amount", () => {
        render(<CostLabel productType="SEED_PACKETS" count="12" />)

        const label = screen.getByText(/Number of/)

        expect(label).toHaveTextContent(
          "Number of seed packets ($4 * 12 = $48)"
        )
      })
    })
  })

  describe("when the productType is seedlings", () => {
    describe("when no amount is entered", () => {
      it("shows unit price and $0", () => {
        render(<CostLabel productType="SEEDLINGS" count="" />)

        const label = screen.getByText(/Number of/)

        expect(label).toHaveTextContent("Number of seedlings ($8 * = $0)")
      })
    })

    describe("when an amount is entered", () => {
      it("shows unit amount and total price", () => {
        render(<CostLabel productType="SEEDLINGS" count="12" />)

        const label = screen.getByText(/Number of/)

        expect(label).toHaveTextContent("Number of seedlings ($8 * 12 = $96)")
      })
    })
  })
})
