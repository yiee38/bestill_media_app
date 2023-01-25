import React, { useState } from "react";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";

const Login = (props) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    const apiName = 'ArtistProfiles';
		const path = '/admin';
		const myInit = {
			body: {
        passcode: passcode,
			}
		};
    // Call the lambda function with the passcode in the payload
    
    API.post(apiName, path, myInit)
		.then((response) => {
        const token = response.token;
        localStorage.setItem("bestillMediaToken", token);
        setError("");
        props.setIsAuthenticated(true);
        navigate(props.path);
		})
		.catch((error) => {
				console.log(error.response.data.message);
        setError(`Unable to log in, ${error.response.data.message}`);
		});
    
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column',
        flex: '1', 
        gap: 'var(--font-small)', 
        fontSize: 'var(--font-small)'
      }}>
      <div style={{display: 'flex', flexDirection: 'row', gap: 'var(--font-tiny)'}}>
        <label htmlFor="passcode" style={{}}>PASSCODE:</label>
        <input
          type="text"
          id="passcode"
          value={passcode}
          onChange={(event) => setPasscode(event.target.value)}
          style={{
            backgroundColor: 'var(--bg-color-primary)', 
            border: '1px solid var(--font-color-primary)',
            color: 'var(--font-color-primary)'
          }}
        />
      </div>
      <button type="submit" disabled={passcode===""} style={{fontSize: 'var(--font-small)'}}>Log in</button>
      {error !== "" && (<div>{error}</div>)}
    </form>
  )
}

export default Login
