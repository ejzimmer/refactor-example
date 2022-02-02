import React from "react"

export function ProductTypeSelector({ onChange, value }) {
  const handleChange = (event) => {
    const productType = event.currentTarget.value
    onChange(productType)
  }

  return (
    <fieldset style={{ display: "flex", gap: "1.5em" }}>
      <legend>Product type</legend>
      <label>
        <input
          type="radio"
          name="product_type"
          value="seed"
          checked={value === "seed"}
          onChange={handleChange}
        />
        Seeds
      </label>
      <label>
        <input
          type="radio"
          name="product_type"
          value="seedling"
          checked={value === "seedling"}
          onChange={handleChange}
        />
        Seedlings
      </label>
    </fieldset>
  )
}
