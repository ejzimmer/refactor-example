import React from "react"

const productNames = {
  SEED_PACKETS: "Seed Packets",
  SEEDLINGS: "Seedlings",
  PLANTS: "Plants",
}

export function ProductTypeSelector({ onChange, value }) {
  const handleChange = (event) => {
    const productType = event.currentTarget.value
    onChange(productType)
  }

  const productTypes = Object.entries(productNames)

  return (
    <fieldset style={{ display: "flex", gap: "1.5em" }}>
      <legend>Product type</legend>
      {productTypes.map(([key, label]) => (
        <label key={key}>
          <input
            type="radio"
            name="product_type"
            value={key}
            checked={value === key}
            onChange={handleChange}
          />
          {label}
        </label>
      ))}
    </fieldset>
  )
}
