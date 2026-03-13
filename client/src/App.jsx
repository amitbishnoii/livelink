import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Setup = lazy(() => import("./pages/Setup"));
const Chat = lazy(() => import("./pages/Chat"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
