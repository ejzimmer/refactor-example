import './App.css';
import { ProductTypeSelector } from './ProductTypeSelector';
import { fetchPostage } from './fetchPostage'
import { useState } from 'react'

// probably need to include actual product in here somewhere

const PRICES = {
  SEEDS: 4,
  SEEDLINGS: 8
}

function App() {
  const [productType, setProductType] = useState('seed')
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
    <form>
      <ProductTypeSelector onChange={handleProductTypeChange} value={productType} />
      {productType == "seed" && (
        <label htmlFor="count">Number of seed packets (${PRICES.SEEDS} * {count} = ${PRICES.SEEDS * count})</label>
      )}
      {productType == "seedling" && (
        <label htmlFor="count">Number of seedlings (${PRICES.SEEDLINGS} * {count} = ${PRICES.SEEDLINGS * count})</label>
      )}
      <input type="number" onChange={handleCountChange} />
      { productType == 'seed' && <label style={{ color: 'green' }}>Postage = $8</label>}
      { productType != 'seed' && postage >= 0 && (
        <label style={{ color: 'green' }}>Postage = ${postage}</label>
      )}
      { productType != 'seed' && postage < 0 && (
        <label style={{ color: 'red' }}>Could not calculate postage. Please contact us.</label>
      )}
    </form>
  );
}

export default App;
