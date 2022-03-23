import React,{Component} from "react";
import "../../../css/AdminProducts.css"
import ShowAllEmploye from "./Employees/ShowAllEmploye";
import SideNav from "./SideNav";



function AdminPage(){

    return (
        <>
            <SideNav  tab="products"/>
            <div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0" id="up_bar">
                <ShowAllEmploye/>
            </div>



        </>


    );

};




export default AdminPage;
