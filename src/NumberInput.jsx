import { PRICES } from "./prices"

const productNames = {
  SEED_PACKETS: "seed packets",
  SEEDLINGS: "seedlings",
  PLANTS: "plants",
}
export function NumberInput({ productType, count, onCountChange }) {
  const price = PRICES[productType]
  const number = count || 0

  return (
    <>
      <label htmlFor="count">
        Number of {productNames[productType]} (${price} * {number} = $
        {price * number})
      </label>
      <br />
      <input
        id="count"
        type="number"
        onChange={(event) => onCountChange(event.currentTarget.value)}
        value={count}
      />
    </>
  )
}
