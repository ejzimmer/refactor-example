import "./App.css"
import { ProductTypeSelector } from "./ProductTypeSelector"
import { fetchPostage } from "./fetchPostage"
import { useState } from "react"
import styled from "styled-components"
import { PRICES } from "./prices"

export function Product({ product }) {
  const [productType, setProductType] = useState("seed_packets")
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
    if (productType == "seed_packets") return

    if (count == 0) {
      setPostage(0)
    }

    const postage = await fetchPostage(count)
    setPostage(postage)
  }

  return (
    <Container>
      <Heading>{product}</Heading>
      <ProductImage src={`${product}.jpg`} alt={product} />
      <Form>
        <ProductTypeSelector
          onChange={handleProductTypeChange}
          value={productType}
        />
        <div>
          {productType == "seed_packets" && (
            <label htmlFor="count">
              Number of seed packets (${PRICES.SEED_PACKETS} * {count} = $
              {PRICES.SEEDS * count})
            </label>
          )}
          {productType == "seedlings" && (
            <label htmlFor="count">
              Number of seedlings (${PRICES.SEEDLINGS} * {count} = $
              {PRICES.SEEDLINGS * count})
            </label>
          )}
          <br />
          <input id="count" type="number" onChange={handleCountChange} />
        </div>
        {productType == "seed_packets" && <Postage>Postage = $8</Postage>}
        {productType != "seed_packets" && postage >= 0 && (
          <Postage>Postage = ${postage}</Postage>
        )}
        {productType != "seed_packets" && postage < 0 && (
          <Error>Could not calculate postage. Please contact us.</Error>
        )}

        {productType == "seed_packets" && (
          <Total>Total: ${PRICES.SEED_PACKETS * count + 8}</Total>
        )}
        {productType != "seed_packets" && (
          <Total>Total: ${PRICES.SEEDLINGS * count + postage}</Total>
        )}
      </Form>
    </Container>
  )
}

const Container = styled.section`
  display: grid;
  grid-template-columns: 30vw 30vw;
  gap: 20px;
`

const Heading = styled.h2`
  grid-column: 1/-1;
  text-transform: capitalize;
`

const ProductImage = styled.img`
  width: 100%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Postage = styled.div`
  color: green;
`
const Error = styled.div`
  color: red;
`
const Total = styled.div`
  font-weight: bold;
`
