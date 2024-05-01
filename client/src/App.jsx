import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import HomePage from "./pages/home/homePage";
import ProtectedRoute from "./components/protectedRoute";

function App() {

  return (
            <BrowserRouter>
            <Routes>
        <Route path="/login" element={<LoginPage />} />
                        <Route
                    path="/home-page"
                    element={<ProtectedRoute Component={HomePage} />}
                />
        </Routes>
    </BrowserRouter>
  )
}

export default App
