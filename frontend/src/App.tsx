import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import AnimatedBackground from "./components/AnimatedBackground"
import SharedView from "./pages/SharedView"

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/share/:hash" element={<SharedView />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App