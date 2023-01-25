import { useResolvedPath } from "react-router";
import React, {useState, useEffect} from "react";
import Login from "../Admin/login";
import { API } from "aws-amplify";

const SecuredRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const url = useResolvedPath("").pathname;

  useEffect(() => {
    const token = localStorage.getItem("bestillMediaToken");
    if (!token) {
      setIsAuthenticated(false);
      setReady(true);
      return;
    }

    const apiName = 'ArtistProfiles';
    const path = '/admin';
    const myInit = {
        headers: {
            authorization: token,
        }
    };

    API.get(apiName, path, myInit)
    .then((response) => {
        console.log(response);
        setIsAuthenticated(true);
        setReady(true);
    })
    .catch((error) => {
        setIsAuthenticated(false);
        console.log(error.response.data.message);
        setReady(true);
    });

    
  }, [])
  if (ready)
    return !ready ? <div>Authenticating, one moment</div> : isAuthenticated ? children :  <Login path={url} setIsAuthenticated={setIsAuthenticated}/>;
  else 
    return <div>AUTHENTICATING</div>

  /*
  return (
    

    <Route 
        path={path} 
        element={isAuthenticated ? (
            element
        ) : (
            <Login path={path} setIsAuthenticated={setIsAuthenticated} />
        )}>
    </Route>
  )*/
}

export default SecuredRoute;