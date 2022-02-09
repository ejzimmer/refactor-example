import { render } from "@testing-library/react"
import { Postage } from "../Postage"

describe("Postage", () => {
  describe("when no postage is passed in", () => {
    it("displays an error message", () => {
      const { container } = render(<Postage />)

      expect(container).toHaveTextContent(
        "Could not calculate postage. Please contact us."
      )
    })
  })

  describe("when postage is passed in", () => {
    it("displays the postage", () => {
      const { container } = render(<Postage postage="8" />)

      expect(container).toHaveTextContent("Postage = $8")
    })
  })
})
