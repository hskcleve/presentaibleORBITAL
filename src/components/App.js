import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import TestPage from "../pages/TestPage"
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = () => {
  return (
    <div className='pagefiller'>
    <Router>
      <Switch>
        <Route exact path="/TestPage">
          <TestPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/loggedin">
          <Navbar />
        </Route>
        <Route exact path="/registered">
          <LoginPage />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
    </div>
  );
};

export default App;
