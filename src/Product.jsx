import "./App.css"
import { ProductTypeSelector } from "./ProductTypeSelector"
import { fetchPostage } from "./fetchPostage"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { PRICES } from "./prices"

export function Product({ product }) {
  const [productType, setProductType] = useState("SEED_PACKETS")
  const [count, setCount] = useState("")
  const [postage, setPostage] = useState(0)

  const handleProductTypeChange = (productType) => {
    setProductType(productType)
  }

  const handleCountChange = (event) => {
    setCount(event.currentTarget.value)
  }

  useEffect(() => {
    calculatePostage()
  }, [productType, count])

  const calculatePostage = async () => {
    if (productType == "SEED_PACKETS") return

    if (!count) {
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
          {productType == "SEED_PACKETS" && (
            <label htmlFor="count">
              Number of seed packets (${PRICES.SEED_PACKETS} * {count || 0} = $
              {PRICES.SEED_PACKETS * count || 0})
            </label>
          )}
          {productType == "SEEDLINGS" && (
            <label htmlFor="count">
              Number of seedlings (${PRICES.SEEDLINGS} * {count || 0} = $
              {PRICES.SEEDLINGS * count || 0})
            </label>
          )}
          <br />
          <input
            id="count"
            type="number"
            onChange={handleCountChange}
            value={count}
          />
        </div>
        {productType == "SEED_PACKETS" && <Postage>Postage = $8</Postage>}
        {productType != "SEED_PACKETS" && postage >= 0 ? (
          <Postage>Postage = ${postage}</Postage>
        ) : (
          productType != "SEED_PACKETS" && (
            <Error>Could not calculate postage. Please contact us.</Error>
          )
        )}

        {count === "" ? (
          <Total>Please enter a number to see the total</Total>
        ) : productType == "SEED_PACKETS" ? (
          <Total>Total: ${PRICES.SEED_PACKETS * count + 8}</Total>
        ) : (
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
