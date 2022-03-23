import {BrowserRouter as Router, Routes ,Switch,Route} from 'react-router-dom'

import AdminLogin from "./pages/admin/Admin-Component/AdminLogin";
import SideNav from "./pages/admin/Admin-Component/SideNav";
import AdminDashboard from "./pages/admin/Admin-Component/Dashboard/AdminDashboard";
import DashboardPage from "./pages/admin/Admin-Component/DashboardPage";
import ClientsPage from "./pages/admin/Admin-Component/ClientsPage";
import EditClients from "./pages/admin/Admin-Component/Clients/EditClients";
import EmployePage from "./pages/admin/Admin-Component/EmployePage";
import EquipmentsPage from "./pages/admin/Admin-Component/EquipmentsPage";
import Payments from "./pages/admin/Admin-Component/PaymentsPage";


import axios from "axios";
import AdminPrivateRoute from "./AdminPrivateRoute";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.baseURL="http://localhost:8080/"
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials=true;
axios.interceptors.request.use(function (config){
    const token=localStorage.getItem('token');
    if(token!==undefined && token!==null)
        config.headers.authorization='Bearer '+token;
    else
        config.headers.authorization='';

    return config;
});

function App() {
  return (
      <Router>
          <Switch>
          <AdminPrivateRoute  path="/Dash" component={DashboardPage}/>
          <AdminPrivateRoute  path="/Client" component={ClientsPage}/>
          <AdminPrivateRoute  path="/Equipment" component={EquipmentsPage}/>
          <AdminPrivateRoute  path="/Employe" component={EmployePage}/>
          <AdminPrivateRoute  path="/pay" component={Payments}/>
          <Route exact path="/" component={AdminLogin}/>
        </Switch>
      </Router>
  );
}

export default App;
