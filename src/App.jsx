
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './Layout';
import Home from "./Home";
import About from "./About";
import Flag from "./Flag";
import RacingGame from "./RacingGame";
import LottoGenerator from "./LottoGenerator";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="About" element={<About />} />
            <Route path="Flag" element={<Flag />} />
            <Route path="racing" element={<RacingGame />} />
            <Route path="lotto" element={<LottoGenerator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
