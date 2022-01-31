import "./App.css"
import { ProductTypeSelector } from "./ProductTypeSelector"
import { fetchPostage } from "./fetchPostage"
import { useState } from "react"

const PRICES = {
  SEEDS: 4,
  SEEDLINGS: 8,
}

export function Product({ product }) {
  const [productType, setProductType] = useState("seed")
  const [count, setCount] = useState(0)
  const [postage, setPostage] = useState(-1)

  const handleProductTypeChange = (productType) => {
    setProductType(productType)
  }

  const handleCountChange = (event) => {
    setCount(event.currentTarget.value)
    calculatePostage(event.currentTarget.value, setPostage)
  }

  const calculatePostage = async (count, setPostage) => {
    if (productType == "seeds") return

    if (count == 0) {
      setPostage(0)
    }

    const postage = await fetchPostage(count)
    setPostage(postage)
  }

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "30vw 30vw",
        gap: "20px",
      }}
    >
      <h2 style={{ gridColumn: "1/-1", textTransform: "capitalize" }}>
        {product}
      </h2>
      <img style={{ width: "100%" }} src={`${product}.jpg`} alt={product} />
      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <ProductTypeSelector
          onChange={handleProductTypeChange}
          value={productType}
        />
        <div>
          {productType == "seed" && (
            <label htmlFor="count">
              Number of seed packets (${PRICES.SEEDS} * {count} = $
              {PRICES.SEEDS * count})
            </label>
          )}
          {productType == "seedling" && (
            <label htmlFor="count">
              Number of seedlings (${PRICES.SEEDLINGS} * {count} = $
              {PRICES.SEEDLINGS * count})
            </label>
          )}
          <input type="number" onChange={handleCountChange} />
        </div>
        {productType == "seed" && (
          <label style={{ color: "green" }}>Postage = $8</label>
        )}
        {productType != "seed" && postage >= 0 && (
          <label style={{ color: "green" }}>Postage = ${postage}</label>
        )}
        {productType != "seed" && postage < 0 && (
          <label style={{ color: "red" }}>
            Could not calculate postage. Please contact us.
          </label>
        )}

        {productType == "seed" && (
          <label>Total: ${PRICES.SEEDS * count + 8}</label>
        )}
        {productType != "seed" && (
          <label style={{ fontWeight: "bold" }}>
            Total: ${PRICES.SEEDLINGS * count + postage}
          </label>
        )}
      </form>
    </section>
  )
}
