import { StockCharts } from "./components/chart/StockCharts"
import { Sidebar } from "./components/sidebar/Sidebar"
import { useState } from "react"

function App() {
  const [prices, setPrices] = useState({})
  
  return (
    <>
      <Sidebar prices={prices}/>
      <StockCharts setPrices={setPrices}/>
    </>
  )
}

export default App
