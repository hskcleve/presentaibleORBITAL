import { Redirect, Route } from "react-router-dom";
import firebase from "firebase";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = firebase.auth().currentUser;

  return (
    <Route
      {...rest}
      render={props=> {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}>
    </Route>
  )
}
