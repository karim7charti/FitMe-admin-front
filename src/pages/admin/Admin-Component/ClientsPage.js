import React,{Component} from "react";
import "../../../css/AdminProducts.css"
import ShowAllClients from "./Clients/ShowAllClients";
import SideNav from "./SideNav";



function AdminPage(){

    return (
        <>
            <SideNav  tab="products"/>
            <div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0" id="up_bar">
                <ShowAllClients/>
            </div>



        </>


    );

};




export default AdminPage;
