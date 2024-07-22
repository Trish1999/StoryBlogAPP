import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import HomePage from "./pages/home/homePage";
import ProtectedRoute from "./components/protectedRoute";
import CardPage from "./pages/cardPage/CardPage";

function App() {

  return (
            <BrowserRouter>
            <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/home-page" element={<ProtectedRoute Component={HomePage} />} />
        <Route path="/blog/:id" element={<CardPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
