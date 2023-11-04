import "./App.css";
import { Outlet, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import Login from "./Authorization/Login";
import { useEffect, useState } from "react";
import Homepage from "./AppLayout/Homepage";
import Dashboard from "./Masters/Dashboard";
import Books from "./Masters/Books";
function App() {
    let location = useLocation();

    var [loading, setLoading] = useState(true);
    var [isverified, setIsVerified] = useState(true);

    function validateLogin() {
        setLoading(true);
        if (localStorage.getItem("isLoggedIn")) {
            setIsVerified(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        validateLogin();
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route
                    path="*"
                    element={
                        loading ? (
                            <div
                                className="App"
                                style={{ textAlign: "center" }}
                            >
                                <Spin
                                    size="large"
                                    style={{ marginTop: "50px" }}
                                />
                            </div>
                        ) : isverified ? (
                            <>
                                <Homepage />
                            </>
                        ) : (
                            <Navigate
                                to="/login"
                                replace={true}
                                state={{
                                    from: location.pathname + location.search,
                                }}
                            />
                        )
                    }
                >
                    <Route path="masters" element={<Outlet />}>
                        <Route path="dashboard" element={<Dashboard />}/>
                        <Route path="books" element={<Books />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
