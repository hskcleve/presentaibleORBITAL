import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Mainpage from "../pages/Mainpage";
import AboutPage from "../pages/About";
import DashboardPage from "../pages/Dashboard";
import SubmissionsPage from "../pages/SubmissionsPage";
import ViewPostPage from "../pages/ViewPostPage";
import ExplorePage from "../pages/ExplorePage";
import SpeechRecognitionPage from "../pages/SpeechRecognitionPage";
import { AuthProvider } from "../contexts/AuthContext"

const App = () => {

  return (
    <div className='pagefiller'>
    <Router>
      <AuthProvider>
      <Switch>
        <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/registered">
            <LoginPage />
          </Route>
          <PrivateRoute exact path="/loggedin" component={Mainpage}/>
          <PrivateRoute exact path="/" component={Mainpage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage}/>
          <PrivateRoute exact path="/explore" component={ExplorePage}/>
          <PrivateRoute exact path="/about" component={AboutPage}/>
          <PrivateRoute path="/explore/viewpost/" component={ViewPostPage}/>
          <PrivateRoute path="/ownsubs/viewpost/" component={ViewPostPage}/>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;









