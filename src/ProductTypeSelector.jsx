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
          value="SEED_PACKETS"
          checked={value === "SEED_PACKETS"}
          onChange={handleChange}
        />
        Seed Packets
      </label>
      <label>
        <input
          type="radio"
          name="product_type"
          value="SEEDLINGS"
          checked={value === "SEEDLINGS"}
          onChange={handleChange}
        />
        Seedlings
      </label>
    </fieldset>
  )
}
