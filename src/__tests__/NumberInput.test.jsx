import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NumberInput } from "../Product"

describe("NumberInput component", () => {
  describe("when the number changes", () => {
    it("calls the onChange handler", async () => {
      const onChange = jest.fn()
      render(
        <NumberInput productType="SEED_PACKETS" count="" onChange={onChange} />
      )

      const input = screen.getByRole("spinbutton")
      await userEvent.type(input, "4")

      expect(onChange).toHaveBeenCalledWith("4")
    })
  })

  describe("when the productType is seed packets", () => {
    it("shows unit price and $0 when no number is entered", () => {
      render(
        <NumberInput productType="SEED_PACKETS" count="" onChange={jest.fn()} />
      )

      const label = screen.getByText(/Number of/)

      expect(label).toHaveTextContent("Number of seed packets ($4 * 0 = $0)")
    })

    it("shows unit price and subtotal when a number is entered", () => {
      render(
        <NumberInput
          productType="SEED_PACKETS"
          count="12"
          onChange={jest.fn()}
        />
      )

      const label = screen.getByText(/Number of/)

      expect(label).toHaveTextContent("Number of seed packets ($4 * 12 = $48)")
    })
  })

  describe("when the productType is seedlings", () => {
    it("when no amount is entered it shows unit price and $0", () => {
      render(
        <NumberInput productType="SEEDLINGS" count="" onChange={jest.fn()} />
      )

      const label = screen.getByText(/Number of/)

      expect(label).toHaveTextContent("Number of seedlings ($8 * 0 = $0)")
    })

    it("shows unit amount and subtotal when a number is entered", () => {
      render(
        <NumberInput productType="SEEDLINGS" count="12" onChange={jest.fn()} />
      )

      const label = screen.getByText(/Number of/)

      expect(label).toHaveTextContent("Number of seedlings ($8 * 12 = $96)")
    })
  })

  describe("when the productType is plants", () => {
    it("when no amount is entered it shows unit price and $0", () => {
      render(<NumberInput productType="PLANTS" count="" onChange={jest.fn()} />)

      const label = screen.getByText(/Number of/)

      expect(label).toHaveTextContent("Number of plants ($15 * 0 = $0)")
    })

    it("shows unit amount and subtotal when a number is entered", () => {
      render(
        <NumberInput productType="PLANTS" count="12" onChange={jest.fn()} />
      )

      const label = screen.getByText(/Number of/)

      expect(label).toHaveTextContent("Number of plants ($15 * 12 = $180)")
    })
  })
})
