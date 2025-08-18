import { Dashboard } from "./pages/Dashboard";
import { Sharebrain } from "./pages/Sharebrain";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* @ts-ignore*/}
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/api/v1/brain/share/:sharehash" element={<Sharebrain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
