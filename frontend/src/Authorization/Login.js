import { Form, Input, Button, Typography, message, Segmented, Select } from "antd";
import SignupForm from './signupForm';
import LoginForm from './loginForm';
import { useState } from "react";
import "../App.css"

const Login = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [userType, setUserType] = useState('user');
  
  const handleChange = (value) => {
    setUserType(value);
  }

  return (
    <>
    <div className="App">
        <div className="container" style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2%"}}>
          <div className="toggle-container" style={{ marginRight: "10px"}}>

            <Button onClick={()=>{setIsSignup(!isSignup)}}>{isSignup ? "Login" : "Signup"}</Button>
                        
          </div>
          <div className="user-type-selector">
            <label htmlFor="user-type">User Type: </label>
            <Segmented 
            defaultValue="user"
            value={userType}
            onChange={handleChange}
            size="small"
            options={[{label: (<div style={{ padding: 4}}> <div>Librarian</div> <div>Admin</div></div>),value: 'librarian',},
                      {label: (<div style={{ padding: 4}}> <div>Reader</div> <div>User</div></div>),value: 'user',},]}

            />
            
          </div>
        </div>
        <div className="form-container">
            <div className="box">
              {isSignup ? <SignupForm userType={userType} /> : <LoginForm userType={userType} />}
            </div>
          </div>
      </div>
    </>
  );
};
export default Login;
