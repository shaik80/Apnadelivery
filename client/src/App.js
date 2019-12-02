import React,{Fragment,useEffect} from 'react';
import LeafletMap from './components/homepage/LeafletMap'
import Loader from './components/Loader'
import Navbar from './components/Navbar/navbar'
import login from './components/Login/Login'
import registration from './components/Registration/Regisration'
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Alert from "./components/Layouts/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Alert />
          <Switch>
            
            <Route exact path="/regisration" component={registration}/>
            <Route exact path="/login" component={login}/>
            <PrivateRoute exact path="/homepage" component={LeafletMap}/>
            <Route exact path="/" component={Loader}/>
          </Switch>
      </Fragment>
    </Router>
  </Provider>


)};
export default App;
