import "./App.css"
import { ProductTypeSelector } from "./ProductTypeSelector"
import { fetchPostage } from "./fetchPostage"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { PRICES } from "./prices"
import { Postage } from "./Postage"
import { NumberInput } from "./NumberInput"

export function Product({ product }) {
  const [productType, setProductType] = useState("SEED_PACKETS")
  const [count, setCount] = useState("")
  const [postage, setPostage] = useState(0)

  const handleProductTypeChange = (productType) => {
    setProductType(productType)
  }

  const handleCountChange = (count) => {
    setCount(count)
  }

  useEffect(() => {
    calculatePostage()
  }, [productType, count])

  const calculatePostage = async () => {
    if (productType == "SEED_PACKETS") {
      setPostage(8)
      return
    }

    if (!count) {
      setPostage(0)
      return
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
          <NumberInput
            productType={productType}
            count={count}
            onCountChange={handleCountChange}
          />
        </div>
        <Postage postage={postage} />

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

const Total = styled.div`
  font-weight: bold;
`
