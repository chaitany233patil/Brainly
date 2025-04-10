import Dashboard from "./pages/DashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { ShareBrain } from "./pages/ShareBrain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/api/v1/brain/share/:sharehash" element={<ShareBrain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
