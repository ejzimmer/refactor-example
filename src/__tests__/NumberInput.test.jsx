import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NumberInput } from "../NumberInput"

describe("NumberInput component", () => {
  describe("when the number is changed", () => {
    it("calls the onCountChange handler", () => {
      const onCountChange = jest.fn()
      render(
        <NumberInput
          productType="SEED_PACKETS"
          count=""
          onCountChange={onCountChange}
        />
      )

      const input = screen.getByRole("spinbutton")
      userEvent.type(input, "4")

      expect(onCountChange).toHaveBeenCalledWith("4")
    })
  })

  describe("when the productType is seeds", () => {
    describe("when there is no number", () => {
      it("shows unit price and $0", () => {
        render(
          <NumberInput
            productType="SEED_PACKETS"
            count=""
            onCountChange={jest.fn()}
          />
        )

        const label = screen.queryByText(/Number of/)

        expect(label).toHaveTextContent("Number of seed packets ($4 * 0 = $0)")
      })
    })

    describe("when there is a number", () => {
      it("shows unit price and subtotal", () => {
        render(
          <NumberInput
            productType="SEED_PACKETS"
            count="12"
            onCountChange={jest.fn()}
          />
        )

        expect(getLabel()).toHaveTextContent(
          "Number of seed packets ($4 * 12 = $48)"
        )
      })
    })
  })

  describe("when the productType is seedlings", () => {
    describe("when there is no number", () => {
      it("shows unit price and $0", () => {
        render(
          <NumberInput
            productType="SEEDLINGS"
            count=""
            onCountChange={jest.fn()}
          />
        )

        expect(getLabel()).toHaveTextContent(
          "Number of seedlings ($8 * 0 = $0)"
        )
      })
    })

    describe("when an amount is entered", () => {
      it("when there is a number", () => {
        render(<NumberInput productType="SEEDLINGS" count="12" />)

        expect(getLabel()).toHaveTextContent(
          "Number of seedlings ($8 * 12 = $96)"
        )
      })
    })
  })
})

const getLabel = () => screen.getByText(/Number of/)
