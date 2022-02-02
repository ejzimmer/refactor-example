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
          value="seed_packets"
          checked={value === "seed_packets"}
          onChange={handleChange}
        />
        Seed Packets
      </label>
      <label>
        <input
          type="radio"
          name="product_type"
          value="seedlings"
          checked={value === "seedlings"}
          onChange={handleChange}
        />
        Seedlings
      </label>
    </fieldset>
  )
}
