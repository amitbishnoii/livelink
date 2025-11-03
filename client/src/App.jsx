import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Setup from "./pages/Setup"

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
