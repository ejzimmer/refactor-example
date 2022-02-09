import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ProductTypeSelector } from "../ProductTypeSelector"

describe("ProductTypeSelector", () => {
  it("sets the initial value", () => {
    render(<ProductTypeSelector onChange={jest.fn()} value="SEED_PACKETS" />)

    expect(getRadioButton("Seed Packets")).toBeChecked()
  })

  describe("when an option is selected", () => {
    it("emits the value", () => {
      const onChange = jest.fn()

      const { rerender } = render(
        <ProductTypeSelector onChange={onChange} value="SEED_PACKETS" />
      )

      clickRadioButton("Seedlings")

      expect(onChange).toHaveBeenCalledWith("SEEDLINGS")

      rerender(<ProductTypeSelector onChange={onChange} value="SEEDLINGS" />)
      clickRadioButton("Seed Packets")

      expect(onChange).toHaveBeenCalledWith("SEED_PACKETS")
    })
  })
})

const getRadioButton = (name) => screen.getByRole("radio", { name })
const clickRadioButton = (name) => {
  const button = getRadioButton(name)
  userEvent.click(button)
}
