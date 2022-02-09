import { render } from "@testing-library/react"
import { Total } from "../Total"

describe("Total", () => {
  describe("when count is invalid", () => {
    it("displays an error message", () => {
      const { container } = render(
        <Total productType="SEEDLINGS" postage="" count="" />
      )

      expect(container).toHaveTextContent(
        "Please enter a number to see the total"
      )
    })
  })

  describe("when count is valid", () => {
    it("displays the total", () => {
      const { container } = render(
        <Total productType="SEEDLINGS" postage={12} count={3} />
      )

      expect(container).toHaveTextContent("Total: $36")
    })
  })
})
