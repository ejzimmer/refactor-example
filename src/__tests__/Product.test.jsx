import React from "react"
import { Product } from "../Product"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("Product", () => {
  describe("when seed packets are selected with no amount", () => {
    it("matches the snapshot", async () => {
      const { container } = render(<Product product="corn" />)

      const radioButton = screen.getByRole("radio", { name: "Seed Packets" })
      await userEvent.click(radioButton)

      expect(container).toMatchSnapshot()
    })
  })
  describe("when seed packets are selected with an amount", () => {
    it("matches the snapshot", async () => {
      const { container } = render(<Product product="corn" />)

      const radioButton = screen.getByRole("radio", { name: "Seed Packets" })
      await userEvent.click(radioButton)

      const count = screen.getByRole("spinbutton")
      await userEvent.type(count, "4")

      expect(container).toMatchSnapshot()
    })
  })

  describe("when seedlings are selected with no amount", () => {
    it("matches the snapshot", async () => {
      const { container } = render(<Product product="corn" />)

      const radioButton = screen.getByRole("radio", { name: "Seedlings" })
      await userEvent.click(radioButton)

      expect(container).toMatchSnapshot()
    })
  })
  describe("when seedlings are selected with an amount", () => {
    it("matches the snapshot", async () => {
      const { container } = render(<Product product="corn" />)

      const radioButton = screen.getByRole("radio", { name: "Seedlings" })
      await userEvent.click(radioButton)

      const count = screen.getByRole("spinbutton")
      await userEvent.type(count, "4")

      expect(container).toMatchSnapshot()
    })
  })
})
