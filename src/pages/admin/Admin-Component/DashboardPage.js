import React,{Component} from "react";

import SideNav from "./SideNav";
import "../../../css/dashboardStyle.css"
import AdminDashboard from "./Dashboard/AdminDashboard";



function DashboardPage(){


    return (
        <>
            <SideNav  tab="Dashboard"/>
            <div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0" id="dash_bar">
                <AdminDashboard/>
            </div>



        </>


    );

};




export default DashboardPage;
