import styled from "styled-components"
import { PRICES } from "./prices"

export function Total({ count, productType, postage }) {
  return (
    <>
      {count === "" ? (
        <TotalAmount>Please enter a number to see the total</TotalAmount>
      ) : (
        <TotalAmount>
          Total: ${PRICES[productType] * count + postage}
        </TotalAmount>
      )}
    </>
  )
}

const TotalAmount = styled.div`
  font-weight: bold;
`
