import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Ats from "./components/ats/AtsChecker";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.value);
  console.log(isAuth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={isAuth ? <Ats /> : <Navigate to="/login" />}
          />
          {/* <Route
            path="/"
            element={isAuth ? <Ats /> : <Navigate to="/login" />}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
