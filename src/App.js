import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              user ? <AdminPanel user={user} /> : <Login setUser={setUser} />
            }
          />
          <Route path="/login" exact element={<Login setUser={setUser} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
