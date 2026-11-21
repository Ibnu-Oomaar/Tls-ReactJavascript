import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/class" element={<Dashboard />} />
          <Route path="/students" element={<Dashboard />} />
          <Route path="/finance" element={<Dashboard />} />
          <Route path="/staff" element={<Dashboard />} />
          <Route path="/registration" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;